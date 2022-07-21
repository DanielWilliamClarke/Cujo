// src/main.rs

#![feature(associated_type_defaults)]
#![feature(async_closure)]

#[macro_use]
extern crate log;

use std::sync::Mutex;

use actix_web::{
    middleware::Logger,
    web::Data,
    App, HttpServer,
};

use contentful::{ContentfulClient, ContentfulConfig};
use dotenv::dotenv;
use listenfd::ListenFd;

mod auth;
mod blog;
mod cv;
mod prerender;
mod server;
mod graphql;
mod cache;
mod util;

use auth::{Auth0Client, AuthConfig, RedirectClient, RedirectConfig};
use prerender::{PrerenderClient, PrerenderConfig};
use server::{ServerConfig};
use util::FromEnv;
use cache::Cache;
use server::configure_rest_service;
use graphql::{configure_graphql_service, create_schema_with_cache};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let server_config = ServerConfig::from_env();
    let auth_client = Auth0Client::new(AuthConfig::from_env());
    let redirect_client = RedirectClient::new(RedirectConfig::from_env());
    let prerender_client = PrerenderClient::new(PrerenderConfig::from_env());
    let contentful_client = ContentfulClient::new(ContentfulConfig::from_env());
    let cache = Data::new(Mutex::new(
        Cache::generate_cache(contentful_client.clone()).await,
    ));

    let mut server = HttpServer::new(move || {
        App::new()
            .app_data(Data::new(auth_client.clone()))
            .app_data(Data::new(redirect_client.clone()))
            .app_data(Data::new(prerender_client.clone()))
            .app_data(Data::new(contentful_client.clone()))
            .app_data(cache.clone())
            .app_data(Data::new(create_schema_with_cache(cache.clone())))
            .wrap(Logger::default())
            .configure(configure_rest_service)
            .configure(configure_graphql_service)
    });

    server = match ListenFd::from_env().take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => server.bind(format!("{}:{}", server_config.host, server_config.port))?,
    };

    info!("Cujo Server Started 👾");
    server.run().await
}
