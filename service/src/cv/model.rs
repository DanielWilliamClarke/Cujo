// src/cv/model.rs

use async_graphql::SimpleObject;
use contentful::models::Asset;
use contentful::{Entries, Entry};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct CV {
    pub about: AboutEntry,
    pub work: WorkEntries,
    pub education: EducationEntries,
    pub skills: SkillsEntry,
    pub projects: ProjectEntries,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct AboutEntry {
    pub entry: About,
    pub includes: Option<Value>,
}

impl AboutEntry {
    pub fn new(item: Entry<About>) -> Self {
        AboutEntry {
            entry: item.entry,
            includes: item.includes,
        }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct WorkEntries {
    pub entries: Vec<Work>,
    pub includes: Option<Value>,
}

impl WorkEntries {
    pub fn new(item: Entries<Work>) -> Self {
        WorkEntries {
            entries: item.entries,
            includes: item.includes,
        }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct EducationEntries {
    pub entries: Vec<Education>,
    pub includes: Option<Value>,
}

impl EducationEntries {
    pub fn new(item: Entries<Education>) -> Self {
        EducationEntries {
            entries: item.entries,
            includes: item.includes,
        }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct SkillsEntry {
    pub entry: Skills,
    pub includes: Option<Value>,
}

impl SkillsEntry {
    pub fn new(item: Entry<Skills>) -> Self {
        SkillsEntry {
            entry: item.entry,
            includes: item.includes,
        }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct ProjectEntries {
    pub entries: Vec<Project>,
    pub includes: Option<Value>,
}

impl ProjectEntries {
    pub fn new(item: Entries<Project>) -> Self {
        ProjectEntries {
            entries: item.entries,
            includes: item.includes,
        }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
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

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Work {
    pub position: String,
    pub company: String,
    pub website: String,
    pub start_date: String,
    pub end_date: Option<String>,
    pub highlights: Vec<String>,
    pub summary: Value,
    pub logo: Asset,
    pub images: Vec<Asset>,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
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

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
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

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct Skill {
    pub name: String,
    pub level: i32,
    pub icon: DevIcon,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct Project {
    pub rank: i32,
    pub name: String,
    pub link: String,
    pub image: Asset,
    pub summary: Value,
    pub tags: Vec<String>,
    pub icon: DevIcon,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct Profile {
    pub url: String,
    pub brand: DevIcon,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct DevIcon {
    pub name: String,
    pub icon: String,
}
