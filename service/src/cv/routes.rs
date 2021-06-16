// src/cv/routes.rs

use std::env;

use actix_web::{get, web, HttpResponse, Responder};
use crate::cv::CV;
use crate::util::parse;

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

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(svc_status);
    cfg.service(get_cv);
}