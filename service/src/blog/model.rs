// src/blog_reader/model,rs

use async_graphql::SimpleObject;
// use async_graphql::Object;
use contentful::{models::{Asset, SystemProperties}, Entries};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct BlogEntries {
    pub entries: Vec<BlogPost>,
    pub includes: Option<Value>
}

impl BlogEntries {
    pub fn new (item: Entries<BlogPost>) -> Self {
        BlogEntries { entries: item.entries, includes: item.includes }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct BlogPost {
    pub id: String,
    pub title: String,
    pub content: Value,
    pub excerpt: Option<String>,
    pub media: Option<Asset>,
    pub tags: Vec<String>,
    pub sys: SystemProperties,
}