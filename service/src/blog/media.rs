// src/blog/media.rs

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Media {
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
    pub author: i64,
    #[serde(rename = "comment_status")]
    pub comment_status: String,
    #[serde(rename = "ping_status")]
    pub ping_status: String,
    pub template: String,
    pub meta: Vec<::serde_json::Value>,
    pub smush: Smush,
    pub description: Description,
    pub caption: Caption,
    #[serde(rename = "alt_text")]
    pub alt_text: String,
    #[serde(rename = "media_type")]
    pub media_type: String,
    #[serde(rename = "mime_type")]
    pub mime_type: String,
    #[serde(rename = "media_details")]
    pub media_details: MediaDetails,
    pub post: Option<i64>,
    #[serde(rename = "source_url")]
    pub source_url: String,
    #[serde(rename = "_links")]
    pub links: Links,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Guid {
    pub rendered: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Title {
    pub rendered: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Smush {
    pub stats: Stats,
    pub sizes: Sizes,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Stats {
    pub percent: f64,
    pub bytes: i64,
    #[serde(rename = "size_before")]
    pub size_before: i64,
    #[serde(rename = "size_after")]
    pub size_after: i64,
    pub time: f64,
    #[serde(rename = "api_version")]
    pub api_version: String,
    pub lossy: bool,
    #[serde(rename = "keep_exif")]
    pub keep_exif: i64,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Sizes {
    pub medium: Medium,
    pub thumbnail: Thumbnail,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Medium {
    pub percent: f64,
    pub bytes: i64,
    #[serde(rename = "size_before")]
    pub size_before: i64,
    #[serde(rename = "size_after")]
    pub size_after: i64,
    pub time: f64,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Thumbnail {
    pub percent: f64,
    pub bytes: i64,
    #[serde(rename = "size_before")]
    pub size_before: i64,
    #[serde(rename = "size_after")]
    pub size_after: i64,
    pub time: f64,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Description {
    pub rendered: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Caption {
    pub rendered: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct MediaDetails {
    pub width: i64,
    pub height: i64,
    pub file: String,
    pub sizes: Sizes2,
    #[serde(rename = "image_meta")]
    pub image_meta: ImageMeta,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Sizes2 {
    pub medium: Medium2,
    pub thumbnail: Thumbnail2,
    pub full: Full,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Medium2 {
    pub file: String,
    pub width: i64,
    pub height: i64,
    #[serde(rename = "mime_type")]
    pub mime_type: String,
    #[serde(rename = "source_url")]
    pub source_url: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Thumbnail2 {
    pub file: String,
    pub width: i64,
    pub height: i64,
    #[serde(rename = "mime_type")]
    pub mime_type: String,
    #[serde(rename = "source_url")]
    pub source_url: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Full {
    pub file: String,
    pub width: i64,
    pub height: i64,
    #[serde(rename = "mime_type")]
    pub mime_type: String,
    #[serde(rename = "source_url")]
    pub source_url: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct ImageMeta {
    pub aperture: String,
    pub credit: String,
    pub camera: String,
    pub caption: String,
    #[serde(rename = "created_timestamp")]
    pub created_timestamp: String,
    pub copyright: String,
    #[serde(rename = "focal_length")]
    pub focal_length: String,
    pub iso: String,
    #[serde(rename = "shutter_speed")]
    pub shutter_speed: String,
    pub title: String,
    pub orientation: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Links {
    #[serde(rename = "self")]
    pub self_field: Vec<SelfField>,
    pub collection: Vec<Collection>,
    pub about: Vec<About>,
    pub author: Vec<Author>,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct SelfField  {
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Collection {
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct About {
    pub href: String,
}

#[derive(Serialize, Deserialize, Clone, Default, PartialEq, Debug)]
#[serde(rename_all = "camelCase")]
pub struct Author {
    pub embeddable: bool,
    pub href: String,
}
