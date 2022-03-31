// src/server/mod.rs

mod config;
mod routes;

pub use config::{ContentfulConfig, ServerConfig};
pub use routes::init;
