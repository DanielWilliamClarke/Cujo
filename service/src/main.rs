// src/main.rs
#![feature(in_band_lifetimes)]

#[macro_use]
extern crate log;

use actix_web::{App, HttpServer, middleware::Logger};
use listenfd::ListenFd;
use dotenv::dotenv;
use routes::{Config, init};

mod cv;
mod blog;
mod util;
mod routes;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let config = Config::new();
    let uri = format!("{}:{}", config.host, config.port);
    println!("Cujo-rust config set!");

    let mut listenfd = ListenFd::from_env();
    let mut server = 
        HttpServer::new(move || 
            App::new()
                .data(config.clone())
                .wrap(Logger::default())
                .configure(init));

    server = match listenfd.take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => server.bind(uri)?
    };

    info!("Cujo Server Started");
    server.run().await
}
