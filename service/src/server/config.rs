// src/server/config.rs

use crate::util::FromEnv;
use serde::Deserialize;

#[derive(Deserialize, Debug, Clone)]
pub struct ServerConfig {
    pub host: String,
    pub port: String,
}
impl FromEnv for ServerConfig {}

#[derive(Deserialize, Debug, Clone)]
pub struct ContentfulConfig {
    pub access_token: String,
    pub space_id: String,
    pub environment: String,
}
impl FromEnv for ContentfulConfig {}
