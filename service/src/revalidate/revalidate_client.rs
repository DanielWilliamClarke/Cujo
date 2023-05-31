// src/revalidate/revalidate_client.rs

use std::collections::HashMap;
use std::sync::Arc;

use reqwest::header;
use serde::Deserialize;
use tokio::sync::RwLock;

use crate::util::FromEnv;
use crate::cache::Cache;

#[derive(Deserialize, Debug, Clone)]
pub struct RevalidateConfig {
    pub cujo_revalidate_url: String,
    pub cujo_revalidate_secret: String,
}
impl FromEnv for RevalidateConfig {}

#[derive(Clone)]
pub struct RevalidateClient {
    config: RevalidateConfig,
}

impl From<RevalidateConfig> for RevalidateClient {
    fn from(config: RevalidateConfig) -> Self {
        RevalidateClient { config }
    }
}

impl RevalidateClient {
    pub async fn portfolio(&self, cache: &Arc<RwLock<Cache>>) {
        self.revalidate("/".to_string())
            .await;
        self.revalidate("/blog".to_string())
            .await;

        let cache = cache.read().await;

        println!("total blog posts to revalidate: {}", cache.blog.entries.len());
        for entry in cache.blog.entries.iter() {
            self.revalidate(format!("/blog/{}", entry.id)).await;
        }
    }

    async fn revalidate(&self, path: String) {
        println!("Revalidating: {}", path);

        let mut map = HashMap::new();
        map.insert("secret", self.config.cujo_revalidate_secret.clone());
        map.insert("path", path);

        let client = reqwest::Client::new();
        let response = client
            .post(self.config.cujo_revalidate_url.clone())
            .header(header::CONTENT_TYPE, "application/json")
            .json(&map)
            .send();

        // Ideally just send and forget the revalidate request
        // if an error is returned its not critical to return it
        let _ = response.await;
    }
}