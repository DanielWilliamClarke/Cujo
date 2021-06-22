// src/blog/model/blog_post.rs

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BlogPost {
    pub id: i64 ,

    pub title: String,
    pub content: String,
    pub excerpt: String,

    pub date: String,
    pub modified: String,

    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(rename = "media_url")]
    pub media_url: Option<String>,

    pub tags: Vec<String>
}
