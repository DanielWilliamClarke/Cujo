// src/cv/model.rs

use contentful::{models::Asset, Entries, Entry};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CV {
    pub about: Option<Entry<About>>,
    pub work: Option<Entries<Work>>,
    pub education: Option<Entries<Education>>,
    pub skills: Option<Entry<Skills>>,
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
#[serde(rename_all = "camelCase")]
pub struct Skills {
    pub summary: Value,
    pub current_summary: Value,
    pub current: Vec<Skill>,
    pub favorite_summary: Value,
    pub favorite: Vec<Skill>,
    pub used_summary: Value,
    pub used: Vec<Skill>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Skill {
    pub name: String,
    pub level: i32,
    pub icon: DevIcon,
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
