// src/auth/auth0_client.rs

use std::collections::HashMap;

use reqwest;
use reqwest::header;
use serde::Deserialize;

use crate::util::FromEnv;

#[derive(Deserialize, Debug, Clone)]
pub struct PrerenderConfig {
    pub prerender_token: String,
    pub prerender_cache_base_url: String,
    pub prerender_api_url: String,
}
impl FromEnv for PrerenderConfig {}

#[derive(Clone)]
pub struct PrerenderClient {
    config: PrerenderConfig,
}

impl PrerenderClient {
    pub fn new(config: PrerenderConfig) -> Self {
        PrerenderClient { config }
    }

    pub async fn recache_portfolio(&self) {
        self.recache(self.config.prerender_cache_base_url.clone())
            .await
    }

    pub async fn recache_blog_post(&self, blog_id: String) {
        self.recache(format!(
            "{}/blog/{}",
            self.config.prerender_cache_base_url, blog_id
        ))
        .await;
    }

    async fn recache(&self, url: String) {
        println!("Recaching: {}", url);

        let mut map = HashMap::new();
        map.insert("prerenderToken", self.config.prerender_token.clone());
        map.insert("url", url);

        let client = reqwest::Client::new();
        let response = client
            .post(self.config.prerender_api_url.clone())
            .header(header::CONTENT_TYPE, "application/json")
            .json(&map)
            .send();

        // Ideally just send and forget the recache request
        // if an error is returned its not critical to return it
        match response.await {
            _ => (),
        }
    }
}
