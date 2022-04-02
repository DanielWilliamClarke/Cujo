// src/server/routes.rs
use actix_web::{get, web, HttpResponse, Responder};

use crate::blog::BlogReader;
use crate::cv::{CVConfig, CVReader, CV};
use crate::util::parse;
use crate::ContentfulConfig;
use contentful::ContentfulClient;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(svc_status)
        .service(get_cv)
        .service(get_blog)
        .service(get_about);
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
async fn get_blog(config: web::Data<ContentfulConfig>) -> impl Responder {
    let client = ContentfulClient::new(&config.access_token, &config.space_id, &config.environment);
    match BlogReader::new(&client).get_entries().await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
        }
    }
}

#[get("/about")]
async fn get_about(config: web::Data<ContentfulConfig>) -> impl Responder {
    let client = ContentfulClient::new(&config.access_token, &config.space_id, &config.environment);
    match CVReader::new(&client).get_about().await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
        }
    }
}
