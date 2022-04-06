// src/lib.rs

mod contentful_client;
mod http_client;
mod json_util;
pub mod models;
mod query_builder;

pub use contentful_client::{ContentfulClient, ContentfulConfig, Entries, Entry};
pub use query_builder::QueryBuilder;