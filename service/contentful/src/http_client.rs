// src/http_client.rs

use reqwest;
use reqwest::StatusCode;
use serde::de::DeserializeOwned;

pub(crate) async fn get<T>(
    url: &String,
    bearer_token: &String,
) -> Result<Option<T>, Box<dyn std::error::Error>>
where
    T: DeserializeOwned,
{
    let client = reqwest::Client::new();
    let resp = client.get(url).bearer_auth(&bearer_token).send().await?;

    match resp.status() {
        StatusCode::OK => {
            let json = resp.json::<T>().await?;
            Ok(Some(json))
        }
        StatusCode::NOT_FOUND => Ok(None),
        _ => {
            log::warn!("{:?}", &resp);
            log::warn!("{:?}", &resp.text().await?);
            todo!("handle response status not < 300");
        }
    }
}
