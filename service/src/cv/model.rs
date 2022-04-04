// src/cv/model.rs

use contentful::{models::Asset, Entries};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CV {
    pub about: Option<Entries<About>>,
    pub work: Option<Entries<Work>>,
    pub education: Option<Entries<Education>>,
    pub skills: Option<Entries<Skills>>,
    pub projects: Option<Entries<Project>>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct About {
    pub name: String,
    pub label: String,
    pub email: String,
    pub phone: String,
    pub website: String,
    pub about: Value,
    pub interests: Value,
    pub images: Vec<Asset>,
    pub profiles: Vec<Profile>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Work {
    pub position: String,
    pub company: String,
    pub website: String,
    pub start_date: String,
    pub end_date: Option<String>,
    pub highlights: Vec<String>,
    pub summary: String,
    pub logo: Asset,
    pub images: Vec<Asset>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Education {
    pub institution: String,
    pub link: String,
    pub area: String,
    pub study_type: String,
    pub start_date: String,
    pub end_date: Option<String>,
    pub grade: Option<String>,
    pub summary: Value,
    pub images: Vec<Asset>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Skills {
    pub summary: Value,
    pub list: Vec<DevIcon>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Project {
    pub rank: i32,
    pub name: String,
    pub link: String,
    pub image: Asset,
    pub summary: Value,
    pub tags: Vec<String>,
    pub icon: DevIcon,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Profile {
    pub url: String,
    pub brand: DevIcon,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DevIcon {
    pub name: String,
    pub icon: String,
}
