use actix_web::{HttpResponse, Responder};
use contentful::ContentfulClient;
use futures::Future;
use serde::Serialize;

use crate::{
    blog::{BlogEntries, BlogReader},
    cv::{CVReader, CV},
    util::Reader,
};

#[derive(Debug, Clone)]
pub struct Cache {
    pub cv: CV,
    pub blog: BlogEntries,
}

impl Cache {
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

    pub async fn regenerate<T, F, Fut>(
        reader: impl Reader<Data = T, Error = impl std::fmt::Display>,
        cache_handler: F,
    ) -> impl Responder
    where
        T: Serialize,
        F: FnOnce(T) -> Fut,
        Fut: Future<Output = ()>,
    {
        match reader.get().await {
            Ok(data) => {
                cache_handler(data).await;
                let body = "Cache regeneration complete!!";
                println!("{}", body);
                HttpResponse::Ok().body(body)
            }
            Err(err) => HttpResponse::InternalServerError()
                .body(format!("Cache could not be regenerated: {}", err)),
        }
    }
}
