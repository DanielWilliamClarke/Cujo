use std::fmt::Display;

use futures::StreamExt;
use pubnub::core::PubNubError;
use pubnub::{Keyset, PubNubClientBuilder};
use pubnub::dx::subscribe::Update;
use serde::Deserialize;

use crate::cache::CacheRegenerator;
use crate::util::FromEnv;

#[derive(Debug)]
pub enum PubnubError {
    TransportBuildError(PubNubError),
}

impl std::error::Error for PubnubError {}
impl Display for PubnubError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            PubnubError::TransportBuildError(err) => {
                write!(f, "Pubnub Subscription error - cannot connect: {:?}", err)
            }
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
    payload: PubnubMessagePayload,
}

#[derive(Deserialize, Debug, Clone)]
pub struct PubnubConfig {
    pubnub_publish_token: String,
    pubnub_subscribe_token: String,
    pubnub_channel_name: String,
}

impl FromEnv for PubnubConfig {}

pub struct PubnubSubscription {
    config: PubnubConfig,
    cache_regenerator: CacheRegenerator,
}

impl PubnubSubscription {
    pub fn from(config: PubnubConfig, cache_regenerator: CacheRegenerator) -> Self {
        PubnubSubscription {
            config,
            cache_regenerator,
        }
    }

    pub async fn subscribe (&self) -> Result<(), PubnubError> {
        let client = PubNubClientBuilder::with_reqwest_transport()
            .with_keyset(Keyset {
                subscribe_key: self.config.pubnub_subscribe_token.clone(),
                publish_key: Some(self.config.pubnub_publish_token.clone()),
                secret_key: None,
            })
            .with_user_id("cujo_service")
            .build();

        let client = match client {
            Ok(client) => client,
            Err(err) => return Err(PubnubError::TransportBuildError(err))
        };

        let channel_name = self.config.pubnub_channel_name.clone();

        let subscription = client
            .subscribe()
            .channels([channel_name.clone()].to_vec())
            .heartbeat(10)
            .execute();

        let subscription = match subscription {
            Ok(subscription) => subscription,
            Err(err) => return Err(PubnubError::TransportBuildError(err))
        };
   
        let cache = self.cache_regenerator.clone();

        tokio::task::spawn(async move {
            log::info!("⏰ Waiting for Pubnub message on channel - {}", channel_name);

            let mut message_stream = subscription.message_stream();
            while let Some(update) = message_stream.next().await {
                match update {
                    Update::Message(message) => {
                        log::info!("📩 Received Pubnub message on channel {} -> {:?}", channel_name, message);

                        // Deserialize the message payload as you wish
                        let pubnub_message = match serde_json::from_slice::<PubnubMessage>(&message.data) {
                            Ok(message) => message,
                            Err(err) => {
                                log::error!("❌ Error deserialising: {:?} -> {:?}", err, message);

                                continue;
                            }
                        };

                        log::info!("📩 Received Pubnub message on channel {} -> {:?}", channel_name, pubnub_message);

                        match pubnub_message.payload.content_type.as_str() {
                            "blogPost" => cache.regenerate_blog_cache().await,
                            _ => cache.regenerate_cv_cache().await,
                        };

                        log::info!("🥙 Pubnub message consumed for channel {}", channel_name);
                    }
                    _ => {} // Ignore other Update variants
                }
            }
        });

        Ok(())
    }
}
