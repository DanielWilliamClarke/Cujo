// src/blog/client.rs

use crate::util::FromEnv;

extern crate base64;

use reqwest;
use reqwest::Error;

use serde::de::DeserializeOwned;
use serde::Deserialize;
use serde_json::Value;

#[derive(Deserialize, Debug, Clone)]
pub struct BlogConfig {
    blog_host: String,
    access_token: String,
    space_id: String,
    environment: String,
}
impl FromEnv for BlogConfig {}

pub struct BlogClient<'a> {
    config: &'a BlogConfig,
}

impl<'a> BlogClient<'a> {
    pub fn new(config: &'a BlogConfig) -> BlogClient<'a> {
        BlogClient { config }
    }

    pub async fn get_entries(&self) -> Result<Value, Error> {
        Ok(self.get::<Value>().await?)
    }

    async fn get<T>(&self) -> Result<T, Error>
    where
        T: DeserializeOwned,
    {
        Ok(reqwest::Client::new()
            .get(format!(
                "{}/spaces/{}/environments/{}/entries?access_token={}",
                self.config.blog_host,
                self.config.space_id,
                self.config.environment,
                self.config.access_token
            ))
            .send()
            .await?
            .json()
            .await?)
    }
}

#[cfg(test)]
mod tests {
    use core::panic;

    use super::{BlogClient, BlogConfig};

    use mockito::mock;
    use serde::{Deserialize, Serialize};
    use serde_json::Value;
    #[derive(Serialize, Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct TestJson {
        pub endpoint: String,
        pub id: String,
    }

    fn setup_http_mocks<T>(path: &str, data: &T) -> mockito::Mock
    where
        T: Serialize,
    {
        let json = serde_json::to_string(data).unwrap();

        mock("GET", path)
            .with_status(200)
            .with_header("content-type", "application/json")
            .with_body(json)
            .create()
    }

    #[actix_rt::test]
    async fn can_get_entries() {
        let blog_config = BlogConfig {
            blog_host: mockito::server_url(),
            access_token: String::from("access_token"),
            space_id: String::from("space_id"),
            environment: String::from("environment"),
        };

        let path = format!(
            "/spaces/{}/environments/{}/entries?access_token={}",
            blog_config.space_id, blog_config.environment, blog_config.access_token
        );

        let data = r#"
        {
        }"#;

        let entries: Value = match serde_json::from_str(data) {
            Ok(data) => data,
            Err(error) => panic!("Error: {:?}", error),
        };

        let mock = setup_http_mocks(path.as_str(), &entries);
        let blog_client = BlogClient::new(&blog_config);

        match blog_client.get_entries().await {
            Ok(_) => mock.assert(),
            Err(error) => panic!("Error: {:?}", error),
        }
    }
}
