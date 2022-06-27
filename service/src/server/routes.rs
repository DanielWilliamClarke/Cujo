// src/server/routes.rs
use actix_web::{http::header::HeaderMap, web, HttpRequest, HttpResponse, Responder};
use std::sync::Mutex;

use crate::auth::{Auth0Client, AuthParameters, RedirectClient};
use crate::blog::BlogReader;
use crate::cv::CVReader;
use crate::util::Reader;
use contentful::ContentfulClient;

use crate::{blog::BlogPost, cv::CV};
use contentful::Entries;

#[derive(Debug, Clone)]
pub struct Cache {
    pub cv: CV,
    pub blog: Option<Entries<BlogPost>>,
}

pub struct Routes;

impl Routes {
    pub async fn svc_status() -> impl Responder {
        HttpResponse::Ok().body("Hello Cujo!")
    }

    pub async fn auth(
        req: HttpRequest,
        auth: web::Data<Auth0Client>,
        redirect_client: web::Data<RedirectClient>,
    ) -> impl Responder {
        let headers = req.headers();
        let parameters = AuthParameters {
            redirect: Routes::extract_header(headers, "redirect"),
            id: Routes::extract_header(headers, "client-id"),
            secret: Routes::extract_header(headers, "client-secret"),
        };

        println!("Attempting authentication for - {}", parameters.redirect);
        let token = match auth.authenticate(parameters.clone()).await {
            Ok(token) => token,
            Err(err) => {
                return HttpResponse::Unauthorized().body(format!("Client unauthorized!: {}", err))
            }
        };

        println!(
            "Client authenticated, redirecting to - {}",
            parameters.redirect
        );
        match redirect_client.redirect(parameters.redirect, token).await {
            Ok(res) if res.status() == 200 => {
                println!("Redirect response valid: {:?}", res);
                HttpResponse::Ok().body(format!(
                    "Authenitcated redirect response valid - {}",
                    res.status()
                ))
            }
            Ok(res) if res.status() != 200 => {
                println!("Redirect response failed: {:?}", res);
                HttpResponse::InternalServerError().body(format!(
                    "Authenitcated redirect response failed - {}",
                    res.status()
                ))
            }
            Err(err) => {
                println!("Redirect request failure - {}", err);
                HttpResponse::BadRequest().body("Authenitcated redirect request failure")
            }
            _ => HttpResponse::BadRequest().body("Unknown failure"),
        }
    }

    pub async fn generate_cache(client: ContentfulClient) -> Cache {
        Cache {
            cv: match CVReader::new(&client).get().await {
                Ok(cv) => cv,
                Err(err) => panic!("Could not generate cv cache - {}", err),
            },
            blog: match BlogReader::new(&client).get().await {
                Ok(blog) => blog,
                Err(err) => panic!("Could not generate blog cache - {}", err),
            },
        }
    }

    pub async fn regenerate_cv_cache(
        client: web::Data<ContentfulClient>,
        cache: web::Data<Mutex<Cache>>,
    ) -> impl Responder {
        println!("calling cv regenerate");
        match CVReader::new(&client).get().await {
            Ok(cv) => {
                let mut locked_cache = cache.lock().unwrap();
                locked_cache.cv = cv;
                HttpResponse::Ok().body("CV Cache regenerated!!")
            }
            Err(err) => HttpResponse::InternalServerError()
                .body(format!("CV Cache could not be regenerated: {}", err)),
        }
    }

    pub async fn regenerate_blog_cache(
        client: web::Data<ContentfulClient>,
        cache: web::Data<Mutex<Cache>>,
    ) -> impl Responder {
        println!("calling blog regenerate");
        match BlogReader::new(&client).get().await {
            Ok(blog) => {
                let mut locked_cache = cache.lock().unwrap();
                locked_cache.blog = blog;
                HttpResponse::Ok().body("Blog Cache regenerated!!")
            }
            Err(err) => HttpResponse::InternalServerError()
                .body(format!("Blog Cache could not be regenerated: {}", err)),
        }
    }

    pub async fn get_cv(cache: web::Data<Mutex<Cache>>) -> impl Responder {
        HttpResponse::Ok().json(cache.lock().unwrap().cv.clone())
    }

    pub async fn get_blog(cache: web::Data<Mutex<Cache>>) -> impl Responder {
        HttpResponse::Ok().json(cache.lock().unwrap().blog.clone())
    }

    fn extract_header(headers: &HeaderMap, header: &str) -> String {
        match headers.get(header) {
            Some(header) => header.to_str().unwrap().to_owned(),
            None => "".to_owned(),
        }
    }
}
