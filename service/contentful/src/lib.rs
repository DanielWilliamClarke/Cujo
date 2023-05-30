// src/lib.rs

mod contentful_client;
mod http_client;
mod json_util;
pub mod models;
mod query_builder;
mod errors;
mod entry_resolver;

pub use contentful_client::{ContentfulClient, ContentfulConfig};
pub use query_builder::QueryBuilder;
pub use errors::ContentfulClientErrors;
pub use models::{Entries, Entry};
