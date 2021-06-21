// src/routes.rs

use actix_web::{get, web, HttpResponse, Responder};
use serde::Deserialize;

use crate::blog::BlogClient;
use crate::cv::CV;
use crate::util::parse;

#[derive(Deserialize, Debug, Clone)]
pub struct Config {
    pub host: String,
    pub port: String,
    data_dir: String,
    wordpress_host: String,
    wordpress_client_id: String,
    wordpress_client_secret: String,
}

impl Config {
    pub fn new() -> Config {
        match envy::from_env::<Config>() {
            Ok(config) => config,
            Err(err) => panic!("Cujo-rust config not set! {:#?}", err)
        }
    }
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(svc_status);
    cfg.service(get_cv);
    cfg.service(get_blog);
    cfg.service(get_blog_post);
}

#[get("/svcstatus")]
async fn svc_status() -> impl Responder {
    HttpResponse::Ok().body("Hello Cujo!")
}

#[get("/cv")]
async fn get_cv(data: web::Data<Config>) -> impl Responder {
    match parse::<CV>(&data.data_dir) {
        Ok(cv) => HttpResponse::Ok().json(cv),
        Err(err) => HttpResponse::InternalServerError().body(format!("Data not found: {}", err)),
    }
}

#[get("/blog")]
async fn get_blog(data: web::Data<Config>) -> impl Responder {
    let client = BlogClient::new(&data.wordpress_host, &data.wordpress_client_id, &data.wordpress_client_secret);
    match client.get_posts().await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
        }
    }
}

#[get("/blog/{id}")]
async fn get_blog_post(data: web::Data<Config>, path: web::Path<String>) -> impl Responder {
    let id = path.into_inner();
    let client = BlogClient::new(&data.wordpress_host, &data.wordpress_client_id, &data.wordpress_client_secret);
    match client.get_post(&id).await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
        }
    }
}
