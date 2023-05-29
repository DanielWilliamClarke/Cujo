// src/http_client.rs

use reqwest::StatusCode;
use serde::de::DeserializeOwned;

use crate::ContentfulClientErrors;

pub(crate) async fn get<T>(
    url: &str,
    bearer_token: &str,
) -> Result<Option<T>, ContentfulClientErrors>
where
    T: DeserializeOwned,
{
    let client = reqwest::Client::new();
    let resp = match client.get(url).bearer_auth(bearer_token).send().await {
        Ok(resp) => resp,
        Err(err) => return Err(ContentfulClientErrors::RequestError(err)),
    };

    match resp.status() {
        StatusCode::OK => {
            match resp.json::<T>().await {
                Ok(json) => Ok(Some(json)),
                Err(err) => Err(ContentfulClientErrors::ResponseMalformed(err)),
            }
        },
        _ => {
            log::warn!("{:?}", &resp);
            Ok(None)
        }
    }
}
