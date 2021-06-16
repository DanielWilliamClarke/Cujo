// src/blog/post.rs

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Post {
    pub id: i64,
    pub date: String,
    #[serde(rename = "date_gmt")]
    pub date_gmt: String,
    pub guid: Guid,
    pub modified: String,
    #[serde(rename = "modified_gmt")]
    pub modified_gmt: String,
    pub slug: String,
    pub status: String,
    #[serde(rename = "type")]
    pub type_field: String,
    pub link: String,
    pub title: Title,
    pub content: Content,
    pub excerpt: Excerpt,
    pub author: i64,
    #[serde(rename = "featured_media")]
    pub featured_media: i64,
    #[serde(rename = "comment_status")]
    pub comment_status: String,
    #[serde(rename = "ping_status")]
    pub ping_status: String,
    pub sticky: bool,
    pub template: String,
    pub format: String,
    pub meta: Vec<::serde_json::Value>,
    pub categories: Vec<i64>,
    pub tags: Vec<i64>,
    #[serde(rename = "_links")]
    pub links: Links,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Guid {
    pub rendered: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Title {
    pub rendered: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Content {
    pub rendered: String,
    pub protected: bool,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Excerpt {
    pub rendered: String,
    pub protected: bool,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Links {
    #[serde(rename = "self")]
    pub self_field: Vec<SelfField>,
    pub collection: Vec<Collection>,
    pub about: Vec<About>,
    pub author: Vec<Author>,
    pub replies: Vec<Reply>,
    #[serde(rename = "version-history")]
    pub version_history: Vec<VersionHistory>,
    #[serde(rename = "predecessor-version")]
    pub predecessor_version: Vec<PredecessorVersion>,
    #[serde(rename = "wp:attachment")]
    pub wp_attachment: Vec<WpAttachment>,
    #[serde(rename = "wp:term")]
    pub wp_term: Vec<WpTerm>,
    pub curies: Vec<Cury>,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct SelfField {
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Collection {
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct About {
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Author {
    pub embeddable: bool,
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Reply {
    pub embeddable: bool,
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct VersionHistory {
    pub count: i64,
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PredecessorVersion {
    pub id: i64,
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct WpAttachment {
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct WpTerm {
    pub taxonomy: String,
    pub embeddable: bool,
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Cury {
    pub name: String,
    pub href: String,
    pub templated: bool,
}
