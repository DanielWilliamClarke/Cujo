// src/blog_reader/model,rs

use async_graphql::SimpleObject;
// use async_graphql::Object;
use contentful::models::{Asset, SystemProperties};
use serde::{Deserialize, Serialize};
use serde_json::Value;

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