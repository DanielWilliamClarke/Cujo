use std::fmt::Display;
use std::{thread, time};

use futures::StreamExt;
use pubnub::core::PubNubError;
use pubnub::dx::subscribe::Update;
use pubnub::subscribe::Presence;
use pubnub::{Keyset, PubNubClientBuilder};
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
    content_type: String,
}

#[derive(Deserialize, Debug, Clone, Default)]
#[serde(rename_all = "camelCase")]
struct PubnubMessage {
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

    pub async fn subscribe(&self) -> Result<(), PubnubError> {
        let channel_name = self.config.pubnub_channel_name.clone();
        let cache = self.cache_regenerator.clone();

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
            Err(err) => return Err(PubnubError::TransportBuildError(err)),
        };

        log::info!("🙌 Pubnub client initialised - ✅");

        tokio::task::spawn(async move {
            loop {
                log::info!("📫 Subscribing to Pubnub channel - {}", channel_name);

                let subscription = client
                    .subscribe()
                    .channels([channel_name.clone()].to_vec())
                    .heartbeat(10)
                    .execute();

                let subscription = match subscription {
                    Ok(subscription) => subscription,
                    Err(err) => {
                        let thirty_seconds = time::Duration::from_secs(30);

                        log::error!(
                            "😰 Unable to subscribe to Pubnub channel: retrying in {:?}s - {} -> {:?} ❌",
                            thirty_seconds,
                            channel_name,
                            err
                        );

                        thread::sleep(thirty_seconds);

                        continue;
                    }
                };

                log::info!(
                    "⏰ Pubnub subscription connected, wating for message on channel - {} - ✅",
                    channel_name
                );

                let mut message_stream = subscription.message_stream();
                while let Some(update) = message_stream.next().await {
                    match update {
                        Update::Presence(Presence::Leave {
                            timestamp,
                            channel,
                            subscription,
                            ..
                        }) => {
                            log::warn!(
                                "💨 Pubnub subcription presence leave detected {} - Channel {}, subscription {}",
                                timestamp,
                                channel,
                                subscription
                            );
                        }
                        Update::Presence(Presence::Timeout {
                            timestamp,
                            channel,
                            subscription,
                            ..
                        }) => {
                            log::warn!(
                                "⌛️ Pubnub subcription presence timeout detected {} - Channel {}, subscription {}",
                                timestamp,
                                channel,
                                subscription
                            );
                        }
                        Update::Message(message) => {
                            log::info!("📩 Received Pubnub message on channel {}", channel_name);

                            // Deserialize the message payload as you wish
                            let pubnub_message =
                                match serde_json::from_slice::<PubnubMessage>(&message.data) {
                                    Ok(message) => message,
                                    Err(err) => {
                                        log::error!(
                                            "❌ Error deserialising: {:?} -> {:?}",
                                            err,
                                            message
                                        );

                                        continue;
                                    }
                                };

                            log::info!(
                                "🔖 Deserialised Pubnub message on channel {} -> {:?}",
                                channel_name,
                                pubnub_message
                            );

                            match pubnub_message.payload.content_type.as_str() {
                                "blogPost" => cache.regenerate_blog_cache().await,
                                _ => cache.regenerate_cv_cache().await,
                            };

                            log::info!("🥙 Pubnub message consumed for channel {}", channel_name);
                        }
                        _ => {} // Ignore other Update variants
                    }
                }

                log::warn!(
                    "😱 Assuming Pubnub subcription has been severed: Reconnecting to {}",
                    channel_name
                );
            }
        });

        Ok(())
    }
}
