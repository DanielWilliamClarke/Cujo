// src/main.rs

#![feature(associated_type_defaults)]

#[macro_use]
extern crate log;

use std::sync::Mutex;

use actix_web::{
    middleware::Logger,
    web::{self, Data},
    App, HttpServer,
};
use actix_web_httpauth::middleware::HttpAuthentication;
use contentful::{ContentfulClient, ContentfulConfig};
use dotenv::dotenv;
use listenfd::ListenFd;

mod auth;
mod blog;
mod cv;
mod server;
mod util;

use crate::auth::{validator, Auth0Client, AuthConfig, RedirectClient};

use server::{Routes, ServerConfig};
use util::FromEnv;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let server_config = ServerConfig::from_env();
    let auth_client = Auth0Client::new(AuthConfig::from_env());
    let redirect_client = RedirectClient::new();
    let client = ContentfulClient::new(ContentfulConfig::from_env());
    let cache = Data::new(Mutex::new(Routes::generate_cache(client.clone()).await));

    let mut server = HttpServer::new(move || {
        App::new()
            .app_data(Data::new(auth_client.clone()))
            .app_data(Data::new(redirect_client.clone()))
            .app_data(Data::new(client.clone()))
            .app_data(cache.clone())
            .wrap(Logger::default())
            .route("/status", web::get().to(Routes::svc_status))
            .route("/cv", web::get().to(Routes::get_cv))
            .route("/blog", web::get().to(Routes::get_blog))
            .route("/auth", web::post().to(Routes::auth))
            .route(
                "/regenerate_cv",
                web::post()
                    .to(Routes::regenerate_cv_cache)
                    .wrap(HttpAuthentication::bearer(validator)),
            )
            .route(
                "/regenerate_blog",
                web::post()
                    .to(Routes::regenerate_blog_cache)
                    .wrap(HttpAuthentication::bearer(validator)),
            )
    });

    server = match ListenFd::from_env().take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => server.bind(format!("{}:{}", server_config.host, server_config.port))?,
    };

    info!("Cujo Server Started 👾");
    server.run().await
}
