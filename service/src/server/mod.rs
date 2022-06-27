// src/server/mod.rs

mod config;
mod routes;

pub use config::ServerConfig;
pub use routes::{Cache, Routes};
