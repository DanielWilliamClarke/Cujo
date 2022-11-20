// src/revalidate/revalidate_client.rs

use std::collections::HashMap;

use reqwest;
use reqwest::header;
use serde::Deserialize;

use crate::util::FromEnv;

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

impl RevalidateClient {
    pub fn new(config: RevalidateConfig) -> Self {
        RevalidateClient { config }
    }

    pub async fn revalidate_portfolio(&self) {
        self.revalidate("/".to_string())
            .await;
        self.revalidate("/blog".to_string())
            .await;
    }

    pub async fn revalidate_blog_post(&self, blog_id: String) {
        self.revalidate(format!("/blog/{}", blog_id))
            .await;
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
        match response.await {
            _ => (),
        }
    }
}