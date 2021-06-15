// src/cv/routes.rs

use crate::cv::{Basics, Location};
use actix_web::{get, web, HttpResponse, Responder};

#[get("/basics")]
async fn get_basics() -> impl Responder {
    HttpResponse::Ok().json(
        Basics{
            name: "Daniel William Clarke".to_string(),
            label: "Software Engineer".to_string(),
            email: "dc@danielclarke.tech".to_string(),
            picture: "headshot.jpg".to_string(),
            phone: "123456".to_string(),
            website: "https://danielclarke.tech".to_string(),
            summary: "Software engineer, trying to be the best, like no one ever was".to_string(),
            location: Location{
                city: "Crawley".to_string(),
                region: "West Sussex".to_string(),
                country_code: "GB".to_string(),
            },
            profiles: Vec::new()
        }
    )
}

pub fn init_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(get_basics);
}