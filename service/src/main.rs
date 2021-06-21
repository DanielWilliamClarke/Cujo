// src/main.rs
#![feature(in_band_lifetimes)]

#[macro_use]
extern crate log;

use actix_web::{middleware::Logger, App, HttpServer};
use dotenv::dotenv;
use listenfd::ListenFd;
use serde::Deserialize;

mod blog;
mod cv;
mod routes;
mod util;

use routes::{init, Config};
use util::FromEnv;

#[derive(Deserialize, Debug, Clone)]
pub struct ServerConfig {
    host: String,
    port: String,
}
impl FromEnv for ServerConfig {}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let mut server = HttpServer::new(move || {
        App::new()
            .data(Config::parse().clone())
            .wrap(Logger::default())
            .configure(init)
    });

    server = match ListenFd::from_env().take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => {
            let config = ServerConfig::parse();
            server.bind(format!("{}:{}", config.host, config.port))?
        }
    };

    info!("Cujo Server Started");
    server.run().await
}
