// src/server/routes.rs
use actix_web::{http::header::HeaderMap, web, HttpRequest, HttpResponse, Responder};
use actix_web_httpauth::middleware::HttpAuthentication;
use futures::StreamExt;
use serde::Deserialize;
use std::sync::Mutex;

use crate::{
    auth::validator,
    auth::{Auth0Client, AuthParameters, RedirectClient},
    blog::BlogReader,
    cache::Cache,
    cv::CVReader,
    prerender::PrerenderClient,
};
use contentful::ContentfulClient;

#[derive(Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct BlogWebhookBody {
    pub entity_id: String,
    pub blog_id: String,
}

struct Routes;

impl Routes {
    pub async fn svc_status() -> impl Responder {
        HttpResponse::Ok().body("Hello Cujo!")
    }

    pub async fn auth(
        req: HttpRequest,
        mut body: web::Payload,
        path: web::Path<String>,
        auth: web::Data<Auth0Client>,
        redirect_client: web::Data<RedirectClient>,
    ) -> impl Responder {
        let endpoint = path.into_inner();
        let headers = req.headers();

        let parameters = AuthParameters {
            redirect: endpoint,
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

        let mut bytes = web::BytesMut::new();
        while let Some(item) = body.next().await {
            let item = match &item {
                Ok(item) => item,
                Err(err) => {
                    return HttpResponse::BadRequest()
                        .body(format!("No payload present for redirect {}", err))
                }
            };

            bytes.extend_from_slice(&item);
        }

        match redirect_client
            .redirect(parameters.redirect, bytes.freeze(), token)
            .await
        {
            Ok(res) if res.status() == 200 => {
                println!("Redirect response valid: {:?}", res);
                HttpResponse::Ok().body(format!(
                    "Authenticated redirect response valid - {}",
                    res.status()
                ))
            }
            Ok(res) if res.status() != 200 => {
                println!("Redirect response failed: {:?}", res);
                HttpResponse::InternalServerError().body(format!(
                    "Authenticated redirect response failed - {}",
                    res.status()
                ))
            }
            Err(err) => {
                println!("Redirect request failure - {}", err);
                HttpResponse::BadRequest().body("Authenticated redirect request failure")
            }
            _ => HttpResponse::BadRequest().body("Unknown failure"),
        }
    }

    pub async fn regenerate_cv_cache(
        contentful_client: web::Data<ContentfulClient>,
        prerender_client: web::Data<PrerenderClient>,
        cache: web::Data<Mutex<Cache>>,
    ) -> impl Responder {
        println!("CV Cache regeneration start!!");

        Cache::regenerate(CVReader::new(&contentful_client), async move |cv| {
            let mut locked_cache = cache.lock().unwrap();
            locked_cache.cv = cv;

            prerender_client.recache_portfolio().await;
        })
        .await
    }

    pub async fn regenerate_blog_cache(
        body: web::Json<BlogWebhookBody>,
        contentful_client: web::Data<ContentfulClient>,
        prerender_client: web::Data<PrerenderClient>,
        cache: web::Data<Mutex<Cache>>,
    ) -> impl Responder {
        println!("Blog Cache regeneration start!!");

        Cache::regenerate(BlogReader::new(&contentful_client), async move |blog| {
            let mut locked_cache = cache.lock().unwrap();
            locked_cache.blog = blog;

            prerender_client
                .recache_blog_post(body.blog_id.clone())
                .await;
        })
        .await
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

pub fn configure_rest_service(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/status").route(web::get().to(Routes::svc_status)))
        .service(web::resource("/cv").route(web::get().to(Routes::get_cv)))
        .service(web::resource("/blog").route(web::get().to(Routes::get_blog)))
        .service(web::resource("/auth/{endpoint}").route(web::post().to(Routes::auth)))
        .service(
            web::resource("/regenerate_cv")
                .route(web::post().to(Routes::regenerate_cv_cache))
                .wrap(HttpAuthentication::bearer(validator)),
        )
        .service(
            web::resource("/regenerate_blog")
                .route(web::post().to(Routes::regenerate_blog_cache))
                .wrap(HttpAuthentication::bearer(validator)),
        );
}
