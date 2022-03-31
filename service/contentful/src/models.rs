// src/models.rs

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Space {
    pub name: String,
    pub locales: Vec<Locale>,
    #[serde(rename = "sys")]
    pub system_properties: SystemProperties,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Locale {
    pub name: String,
    pub code: String,
    pub fallback_code: Option<String>,
    pub default: bool,
    pub optional: bool,
    pub content_management_api: bool,
    pub content_delivery_api: bool,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SystemProperties {
    pub id: String,
    pub version: Option<i32>,
    pub revision: Option<i32>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
    // TODO: More fields
}

impl SystemProperties {
    pub fn new(id: String) -> SystemProperties {
        SystemProperties {
            id,
            version: None,
            revision: None,
            created_at: None,
            updated_at: None,
        }
    }

    pub fn with_version(id: String, version: i32) -> SystemProperties {
        SystemProperties {
            id,
            version: Some(version),
            revision: None,
            created_at: None,
            updated_at: None,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Entry<T> {
    pub sys: SystemProperties,
    pub fields: T,
}

impl<T> Entry<T>
where
    T: Serialize,
{
    pub fn new(entry: T, sys: SystemProperties) -> Entry<T> {
        Entry { sys, fields: entry }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Asset {
    pub description: Option<String>,
    pub title: Option<String>,
    pub file: File,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct File {
    pub file_name: String,
    pub content_type: String,
    pub url: String,
    pub upload_url: Option<String>,
    pub details: FileDetails,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct FileDetails {
    pub size: i64,
    pub image: Option<ImageDetails>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ImageDetails {
    pub height: i32,
    pub width: i32,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RichTextWithIncludes {
    pub document: Value,
    pub includes: Value,
}
