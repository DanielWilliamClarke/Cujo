use std::sync::Arc;

use actix_web::web::Data;
use contentful::ContentfulClient;
use tokio::sync::RwLock;

use crate::{revalidate::RevalidateClient, cv::CVReader, blog::BlogReader, util::Reader};

use super::Cache;

#[derive(Clone)]
pub struct CacheRegenerator {
    contentful_client: ContentfulClient,
    revalidate_client: RevalidateClient,
    cache: Data<Arc<RwLock<Cache>>>,
}

impl CacheRegenerator {
    pub fn from (
        contentful_client: ContentfulClient,
        revalidate_client: RevalidateClient,
        cache: Data<Arc<RwLock<Cache>>>
    ) -> Self {
        CacheRegenerator {
            contentful_client,
            revalidate_client,
            cache
        }
    }

    pub async fn regenerate_cv_cache(&self) {
        let reader = CVReader::from(&self.contentful_client);

        match reader.get().await {
            Ok(cv) => {
                let mut locked_cache = self.cache.write().await;
                locked_cache.cv = cv;

                log::info!("💫 CV cache regenerated");
            },
            Err(err) => eprintln!("Error reading cv: {}", err),
        };

        self.revalidate_client.portfolio(&self.cache).await;
    }

    pub async fn regenerate_blog_cache(&self) {
        let reader = BlogReader::from(&self.contentful_client);

        match reader.get().await {
            Ok(blog) => {
                let mut locked_cache = self.cache.write().await;
                locked_cache.blog = blog;

                log::info!("💫 Blog cache regenerated");
            },
            Err(err) => eprintln!("Error reading blog: {}", err),
        };

        self.revalidate_client.portfolio(&self.cache).await;
    }
}