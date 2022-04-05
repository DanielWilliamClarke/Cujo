// src/http_client.rs

use reqwest;
use reqwest::StatusCode;
use serde::de::DeserializeOwned;

pub(crate) async fn get<T>(
    url: &str,
    bearer_token: &str,
) -> Result<Option<T>, Box<dyn std::error::Error>>
where
    T: DeserializeOwned,
{
    let client = reqwest::Client::new();
    let resp = client.get(url).bearer_auth(&bearer_token).send().await?;

    match resp.status() {
        StatusCode::OK => Ok(Some(resp.json::<T>().await?)),
        _ => {
            log::warn!("{:?}", &resp);
            log::warn!("{:?}", &resp.text().await?);
            Ok(None)
        }
    }
}
