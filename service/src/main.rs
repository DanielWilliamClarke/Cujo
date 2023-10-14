// src/main.rs
#![feature(associated_type_defaults)]
#![feature(async_closure)]

extern crate log;

use std::sync::Arc;

use actix_cors::Cors;
use actix_web::{http, middleware::Logger, web::{Data, self}, App, HttpServer, HttpResponse};
use contentful::{ContentfulClient, ContentfulConfig};
use dotenv::dotenv;
use listenfd::ListenFd;

mod blog;
mod cache;
mod cv;
mod graphql;
mod revalidate;
mod subscription;
mod util;

use cache::Cache;
use graphql::configure_graphql_service;
use revalidate::{RevalidateClient, RevalidateConfig};
use serde::Deserialize;
use tokio::sync::RwLock;
use util::FromEnv;

use crate::{
    cache::CacheRegenerator,
    graphql::CujoSchema,
    subscription::{PubnubConfig, PubnubSubscription},
};

#[derive(Deserialize, Debug, Clone)]
pub struct ServerConfig {
    pub host: String,
    pub port: String,
}

impl FromEnv for ServerConfig {}
impl FromEnv for ContentfulConfig {}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let ServerConfig { host, port } = ServerConfig::from_env();
    let contentful_client = ContentfulClient::from(ContentfulConfig::from_env());
    let revalidate_client = RevalidateClient::from(RevalidateConfig::from_env());

    let cache = Cache::generate_cache(contentful_client.clone()).await;
    let cache = Arc::new(RwLock::new(cache));

    let cache_regenerator = CacheRegenerator::from(
        contentful_client.clone(),
        revalidate_client.clone(),
        cache.clone(),
    );

    let pubnub_subscription = PubnubSubscription::from(PubnubConfig::from_env(), cache_regenerator);
    match pubnub_subscription.subscribe().await {
        Ok(_) => log::info!("Pubnub subscription started! ✅"),
        Err(err) => panic!("Unable to subscribe to Pubnub ❌: {}", err),
    };

    let mut server = HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![
                http::header::AUTHORIZATION,
                http::header::ACCEPT,
                http::header::CONTENT_TYPE,
            ])
            .max_age(3600);

        let schema = Data::new(CujoSchema::from(Data::new(cache.clone())));

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .app_data(schema)
            .configure(configure_graphql_service)
            .default_service(web::to(|| HttpResponse::NotFound()))
    });

    server = match ListenFd::from_env().take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => server.bind(format!("{}:{}", host, port))?,
    };

    log::info!("🦀 Cujo Server Started port {} ✅", port);
    server.run().await
}
