// src/blog_reader/model,rs

use contentful::models::{Asset, SystemProperties};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct BlogPost {
    id: String,
    title: String,
    content: Value,
    excerpt: Option<String>,
    media: Option<Asset>,
    tags: Vec<String>,
    sys: SystemProperties,
}
