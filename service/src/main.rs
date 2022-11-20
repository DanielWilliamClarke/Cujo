// src/main.rs
#![feature(associated_type_defaults)]
#![feature(async_closure)]

extern crate log;

use std::sync::Mutex;

use actix_web::{middleware::Logger, web::Data, App, HttpServer, http};
use contentful::{ContentfulClient, ContentfulConfig};
use dotenv::dotenv;
use listenfd::ListenFd;
use actix_cors::Cors;

mod auth;
mod blog;
mod cache;
mod cv;
mod graphql;
mod rest;
mod revalidate;
mod util;

use auth::{Auth0Client, AuthConfig, RedirectClient, RedirectConfig};
use cache::Cache;
use revalidate::{RevalidateClient, RevalidateConfig};
use graphql::{configure_graphql_service, create_schema_with_cache};
use rest::configure_rest_service;
use serde::Deserialize;
use util::FromEnv;

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

    let auth_client = Auth0Client::new(AuthConfig::from_env());
    let redirect_client = RedirectClient::new(RedirectConfig::from_env());
    let revalidate_client = RevalidateClient::new(RevalidateConfig::from_env());
    let contentful_client = ContentfulClient::new(ContentfulConfig::from_env());

    let cache = Data::new(Mutex::new(
        Cache::generate_cache(contentful_client.clone()).await,
    ));
    let schema = create_schema_with_cache(cache.clone());

    let mut server = HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT, http::header::CONTENT_TYPE])
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(Logger::default())
            .app_data(Data::new(auth_client.clone()))
            .app_data(Data::new(redirect_client.clone()))
            .app_data(Data::new(revalidate_client.clone()))
            .app_data(Data::new(contentful_client.clone()))
            .app_data(Data::new(schema.clone()))
            .app_data(cache.clone())
            .configure(configure_rest_service)
            .configure(configure_graphql_service)
    });

    server = match ListenFd::from_env().take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => server.bind(format!("{}:{}", host, port))?,
    };

    println!("🦀 Cujo Server Started port {}", port);
    server.run().await
}
