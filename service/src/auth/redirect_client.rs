// src/auth/auth0_client.rs

use reqwest::Error;
use reqwest::{self, Response};

use super::AuthToken;

#[derive(Clone)]
pub struct RedirectClient;

impl RedirectClient {
    pub fn new() -> Self {
        RedirectClient {}
    }

    pub async fn redirect(&self, url: String, token: AuthToken) -> Result<Response, Error> {
        let client = reqwest::Client::new();
        client
            .post(url)
            .header(
                "Authorization",
                format!("{} {}", token.token_type, token.access_token),
            )
            .header("content-type", "application/json")
            .send()
            .await
    }
}
