// src/main.rs

#[macro_use]
extern crate log;

use actix_web::{middleware::Logger, web::Data, App, HttpServer};
use dotenv::dotenv;
use listenfd::ListenFd;

mod blog;
mod cv;
mod server;
mod util;

use server::{init, ContentfulConfig, ServerConfig};
use util::FromEnv;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let server_config = ServerConfig::from_env();
    let contentful_config = ContentfulConfig::from_env();

    let mut server = HttpServer::new(move || {
        App::new()
            .app_data(Data::new(contentful_config.clone()))
            .wrap(Logger::default())
            .configure(init)
    });

    server = match ListenFd::from_env().take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => server.bind(format!("{}:{}", server_config.host, server_config.port))?,
    };

    info!("Cujo Server Started");
    server.run().await
}
