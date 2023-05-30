// src/auth/auth0_client.rs

use actix_web::web;
use reqwest::Error;
use reqwest::{self, Response};
use serde::Deserialize;

use crate::util::FromEnv;

use super::AuthToken;

#[derive(Deserialize, Debug, Clone)]
pub struct RedirectConfig {
    pub self_redirect: String,
}
impl FromEnv for RedirectConfig {}

#[derive(Clone)]
pub struct RedirectClient {
    config: RedirectConfig,
}

impl From<RedirectConfig> for RedirectClient {
    fn from(config: RedirectConfig) -> Self {
        RedirectClient { config }
    }
}

impl RedirectClient {
    pub async fn redirect(
        &self,
        endpoint: String,
        payload: web::Bytes,
        token: AuthToken,
    ) -> Result<Response, Error> {
        let client = reqwest::Client::new();
        client
            .post(format!("{}/{}", self.config.self_redirect, endpoint))
            .header(
                "Authorization",
                format!("{} {}", token.token_type, token.access_token),
            )
            .header("content-type", "application/json")
            .body(payload)
            .send()
            .await
    }
}
