// src/main.rs
#[macro_use]
extern crate log;

use actix_web::{middleware::Logger, web::Data, App, HttpServer};
use dotenv::dotenv;
use listenfd::ListenFd;
use serde::Deserialize;

mod blog;
mod cv;
mod routes;
mod util;

use blog::BlogConfig;
use cv::CVConfig;
use routes::init;
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

    let server_config = ServerConfig::from_env();
    let cv_config = CVConfig::from_env();
    let config = BlogConfig::from_env();

    let mut server = HttpServer::new(move || {
        App::new()
            .app_data(Data::new(cv_config.clone()))
            .app_data(Data::new(config.clone()))
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
