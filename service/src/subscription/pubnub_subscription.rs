
use std::fmt::Display;

use futures::StreamExt;
use pubnub_hyper::core::json::JsonValue;
use pubnub_hyper::runtime::tokio_global::TokioGlobal;
use pubnub_hyper::transport::hyper::{Hyper, HyperBuilderError};
use pubnub_hyper::{core::data::channel, Builder};
use serde::Deserialize;

use crate::cache::CacheRegenerator;
use crate::util::FromEnv;

#[derive(Debug)]
pub enum PubnubError {
    TransportBuildError(HyperBuilderError),
}

impl std::error::Error for PubnubError {}
impl Display for PubnubError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PubnubError::TransportBuildError(err) => write!(f, "Pubnub Subscription error - cannot connect: {:?}", err),
        }
    }
}

#[derive(Deserialize, Debug, Clone, Default)]
#[serde(rename_all = "camelCase")]
struct PubnubMessagePayload {
    // entity_id: String,
    content_type: String,
    // environment: String
}

#[derive(Deserialize, Debug, Clone, Default)]
#[serde(rename_all = "camelCase")]
struct PubnubMessage {
    // topic: String,
    payload: PubnubMessagePayload
}

impl From<JsonValue> for PubnubMessage {
    fn from(value: JsonValue) -> Self {
        match serde_json::from_str::<PubnubMessage>(&value.dump()) {
            Ok(value) => value,
            Err(err) => {
                println!("Error deserialising: {:?} -> {:?}", err, value);

                PubnubMessage::default()
            },
        }
    }
}

#[derive(Deserialize, Debug, Clone)]
pub struct PubnubConfig {
    pubnub_publish_token: String,
    pubnub_subscribe_token: String,
    pubnub_channel_name: String
}

impl FromEnv for PubnubConfig {} 

pub struct PubnubSubscription {
    config: PubnubConfig,
    cache_regenerator: CacheRegenerator
}

impl PubnubSubscription {
    pub fn from (
        config: PubnubConfig,
        cache_regenerator: CacheRegenerator
    ) -> Self {
        PubnubSubscription {
            config,
            cache_regenerator
        }
    }

    pub async fn subscribe (&self) -> Result<(), PubnubError> {
        let transport = Hyper::new()
            .publish_key(self.config.pubnub_publish_token.clone())
            .subscribe_key(self.config.pubnub_subscribe_token.clone())
            .build();

        let transport = match transport {
            Ok(transport) => transport,
            Err(err) => return Err(PubnubError::TransportBuildError(err))
        };

        let mut pubnub = Builder::new()
            .transport(transport)
            .runtime(TokioGlobal)
            .build();

        let channel_name: channel::Name = self.config.pubnub_channel_name.parse().unwrap();
        let mut stream = pubnub.subscribe(channel_name.clone()).await;

        let cache = self.cache_regenerator.clone();

        tokio::task::spawn(async move {
            loop {
                println!("Waiting for Pubnub message on channel {}", channel_name);

                let received = stream.next().await;

                println!("Received Pubnub message on channel {} -> {:?}", channel_name, received);

                match received {
                    Some(message) => {
                        let message: PubnubMessage = message.json.into();

                        match message.payload.content_type.as_str() {
                            "blogPost" => {
                                cache.regenerate_blog_cache().await;
                            },
                            _ => {
                                cache.regenerate_cv_cache().await;
                            }
                        };

                        println!("Pubnub message consumed for channel {}", channel_name);

                        continue;
                    }
                    None => continue,
                }
            }
        });

        Ok(())
    }
}

