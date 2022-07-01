// src/server/routes.rs
use actix_web::{http::header::HeaderMap, web, HttpRequest, HttpResponse, Responder};
use futures::Future;
use futures::StreamExt;
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

use crate::auth::{Auth0Client, AuthParameters, RedirectClient};
use crate::blog::BlogReader;
use crate::cv::CVReader;
use crate::prerender::PrerenderClient;
use crate::util::Reader;
use contentful::ContentfulClient;

#[derive(Debug, Clone)]
pub struct Cache {
    pub cv: String,
    pub blog: String,
}

#[derive(Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct BlogWebhookBody {
    pub entity_id: String,
    pub blog_id: String,
}

pub struct Routes;

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
                Ok(cv) => serde_json::to_string(&cv).unwrap(),
                Err(err) => panic!("Could not generate cv cache - {}", err),
            },
            blog: match BlogReader::new(&client).get().await {
                Ok(blog) => serde_json::to_string(&blog).unwrap(),
                Err(err) => panic!("Could not generate blog cache - {}", err),
            },
        }
    }

    pub async fn regenerate_cv_cache(
        contentful_client: web::Data<ContentfulClient>,
        prerender_client: web::Data<PrerenderClient>,
        cache: web::Data<Mutex<Cache>>,
    ) -> impl Responder {
        println!("CV Cache regeneration start!!");

        Routes::regenerate(CVReader::new(&contentful_client), async move |cv| {
            let mut locked_cache = cache.lock().unwrap();
            locked_cache.cv = cv;

            match prerender_client.recache_portfolio().await {
                _ => (),
            }
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

        Routes::regenerate(BlogReader::new(&contentful_client), async move |blog| {
            let mut locked_cache = cache.lock().unwrap();
            locked_cache.blog = blog;

            match prerender_client
                .recache_blog_post(body.blog_id.clone())
                .await
            {
                _ => (),
            }
        })
        .await
    }

    pub async fn get_cv(cache: web::Data<Mutex<Cache>>) -> impl Responder {
        HttpResponse::Ok().body(cache.lock().unwrap().cv.clone())
    }

    pub async fn get_blog(cache: web::Data<Mutex<Cache>>) -> impl Responder {
        HttpResponse::Ok().body(cache.lock().unwrap().blog.clone())
    }

    fn extract_header(headers: &HeaderMap, header: &str) -> String {
        match headers.get(header) {
            Some(header) => header.to_str().unwrap().to_owned(),
            None => "".to_owned(),
        }
    }

    async fn regenerate<F, Fut>(
        reader: impl Reader<Data = impl Serialize, Error = impl std::fmt::Display>,
        cache_handler: F,
    ) -> impl Responder
    where
        F: FnOnce(String) -> Fut,
        Fut: Future<Output = ()>,
    {
        match reader.get().await {
            Ok(data) => {
                cache_handler(serde_json::to_string(&data).unwrap()).await;
                let body = "Cache regeneration complete!!";
                println!("{}", body);
                HttpResponse::Ok().body(body)
            }
            Err(err) => HttpResponse::InternalServerError()
                .body(format!("Cache could not be regenerated: {}", err)),
        }
    }
}
