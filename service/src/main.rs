// src/main.rs
#[macro_use]
extern crate log;

use actix_web::{App, HttpServer, middleware::Logger};
use listenfd::ListenFd;
use dotenv::dotenv;
use std::env;

mod cv;
mod util;
mod blog;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let mut listenfd = ListenFd::from_env();
    let mut server = 
        HttpServer::new(|| 
            App::new()
                .wrap(Logger::default())
                .configure(cv::init_routes));

    server = match listenfd.take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => {
            let host = env::var("HOST").expect("HOST not set");
            let port = env::var("PORT").expect("PORT not set");
            server.bind(format!("{}:{}", host, port))?
        }
    };

    info!("Cujo Server Started");
    server.run().await
}
