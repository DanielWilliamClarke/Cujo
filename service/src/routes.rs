// src/routes.rs

use std::env;
use actix_web::{get, web, HttpResponse, Responder};

use crate::cv::CV;
use crate::util::parse;
use crate::blog::{BlogClient};

#[get("/svcstatus")]
async fn svc_status() -> impl Responder {
    HttpResponse::Ok().body("Hello Cujo!")
}

#[get("/cv")]
async fn get_cv() -> impl Responder {
    let filepath = env::var("DATA_DIR").expect("DATA_DIR not set");

    match parse::<CV>(&filepath) {
        Ok(cv) => HttpResponse::Ok().json(cv),
        Err(err) => HttpResponse::InternalServerError().body(format!("Data not found: {}", err))
    }
}

#[get("/blog")]
async fn get_blog() -> impl Responder {
    let host = env::var("WORDPRESS_HOST").expect("WORDPRESS_HOST not set");

    let client = BlogClient::new(host);
    match client.get_posts().await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
    }
}

#[get("/blog/{id}")]
async fn get_blog_post(path: web::Path<String>) -> impl Responder {
    let host = env::var("WORDPRESS_HOST").expect("WORDPRESS_HOST not set");
    let id = path.into_inner();
    
    let client = BlogClient::new(host);
    match client.get_post(&id).await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
    }
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(svc_status);
    cfg.service(get_cv);
    cfg.service(get_blog);
}