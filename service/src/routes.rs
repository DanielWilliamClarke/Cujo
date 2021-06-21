// src/routes.rs

use actix_web::{get, web, HttpResponse, Responder};

use crate::blog::{ BlogClient, BlogConfig };
use crate::cv::{ CV, CVConfig };
use crate::util::parse;

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
async fn get_cv(config: web::Data<CVConfig>) -> impl Responder {
    match parse::<CV>(&config.data_dir) {
        Ok(cv) => HttpResponse::Ok().json(cv),
        Err(err) => HttpResponse::InternalServerError().body(format!("Data not found: {}", err)),
    }
}

#[get("/blog")]
async fn get_blog(config: web::Data<BlogConfig>) -> impl Responder {
    match BlogClient::new(&config).get_posts().await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
        }
    }
}

#[get("/blog/{id}")]
async fn get_blog_post(config: web::Data<BlogConfig>, path: web::Path<String>) -> impl Responder {
    let id = path.into_inner();
    match BlogClient::new(&config).get_post(&id).await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
        }
    }
}
