// src/main.rs
#[macro_use]
extern crate log;

use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use listenfd::ListenFd;
use dotenv::dotenv;
use std::env;

mod cv;

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello Cujo!")
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();

    let mut listenfd = ListenFd::from_env();
    let mut server = 
        HttpServer::new(|| 
            App::new()
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
