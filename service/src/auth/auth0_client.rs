// src/auth/auth0_client.rs

use std::collections::HashMap;

use reqwest;
use reqwest::Error;
use serde::Deserialize;

use crate::util::FromEnv;

#[derive(Deserialize, Debug, Clone)]
pub struct AuthConfig {
    pub auth_url: String,
    pub audience: String,
}
impl FromEnv for AuthConfig {}

#[derive(Deserialize, Debug, Clone)]
pub struct AuthParameters {
    pub redirect: String,
    pub id: String,
    pub secret: String,
}

#[derive(Default, Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AuthToken {
    #[serde(rename = "access_token")]
    pub access_token: String,
    #[serde(rename = "token_type")]
    pub token_type: String,
}

#[derive(Clone)]
pub struct Auth0Client {
    config: AuthConfig,
}

impl Auth0Client {
    pub fn new(config: AuthConfig) -> Self {
        Auth0Client { config }
    }

    pub async fn authenticate(&self, parameters: AuthParameters) -> Result<AuthToken, Error> {
        let mut map = HashMap::new();
        map.insert("client_id", parameters.id);
        map.insert("client_secret", parameters.secret);
        map.insert("audience", self.config.audience.clone());
        map.insert("grant_type", "client_credentials".to_owned());

        let client = reqwest::Client::new();
        let response = client
            .post(self.config.auth_url.clone())
            .header("content-type", "application/json")
            .json(&map)
            .send()
            .await?;

        Ok(response.json().await?)
    }
}
