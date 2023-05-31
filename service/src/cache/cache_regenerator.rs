use std::sync::Arc;

use contentful::ContentfulClient;
use tokio::sync::Mutex;

use crate::{revalidate::RevalidateClient, cv::CVReader, blog::BlogReader};

use super::Cache;

#[derive(Clone)]
pub struct CacheRegenerator {
    contentful_client: ContentfulClient,
    revalidate_client: RevalidateClient,
    cache: Arc<Mutex<Cache>>,
}

impl CacheRegenerator {
    pub fn from (
        contentful_client: ContentfulClient,
        revalidate_client: RevalidateClient,
        cache: Arc<Mutex<Cache>>
    ) -> Self {
        CacheRegenerator {
            contentful_client,
            revalidate_client,
            cache
        }
    }

    pub async fn regenerate_cv_cache(&self) {
        let reader = CVReader::from(&self.contentful_client);

        Cache::regenerate(reader, async move |cv| {
            let mut locked_cache = self.cache.lock().await;
            locked_cache.cv = cv;
        })
        .await;

        self.revalidate_client.portfolio(self.cache.clone()).await;
    }

    pub async fn regenerate_blog_cache(&self) {
        let reader = BlogReader::from(&self.contentful_client);

        Cache::regenerate(reader, async move |blog| {
            let mut locked_cache = self.cache.lock().await;
            locked_cache.blog = blog;
        })
        .await;

        self.revalidate_client.portfolio(self.cache.clone()).await;
    }
}