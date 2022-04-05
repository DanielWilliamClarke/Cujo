// src/server/routes.rs
use actix_web::{get, web, HttpResponse, Responder};
use serde::Serialize;

use crate::blog::BlogReader;
use crate::cv::CVReader;
use crate::util::Reader;
use contentful::ContentfulClient;

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(svc_status).service(get_cv).service(get_blog);
}

#[get("/svcstatus")]
async fn svc_status() -> impl Responder {
    HttpResponse::Ok().body("Hello Cujo!")
}

#[get("/cv")]
async fn get_cv(client: web::Data<ContentfulClient>) -> impl Responder {
    get(CVReader::new(&client)).await
}

#[get("/blog")]
async fn get_blog(client: web::Data<ContentfulClient>) -> impl Responder {
    get(BlogReader::new(&client)).await
}

async fn get(
    reader: impl Reader<Data = impl Serialize, Error = impl std::fmt::Display>,
) -> impl Responder {
    match reader.get().await {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => {
            HttpResponse::InternalServerError().body(format!("Blog data not found: {}", err))
        }
    }
}
