// src/server/config.rs

use crate::util::FromEnv;
use contentful::ContentfulConfig;
use serde::Deserialize;

impl FromEnv for ContentfulConfig {}

#[derive(Deserialize, Debug, Clone)]
pub struct ServerConfig {
    pub host: String,
    pub port: String,
}
impl FromEnv for ServerConfig {}
