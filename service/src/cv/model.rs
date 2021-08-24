// src/cv/model.rs

use serde::{Deserialize, Serialize};

use crate::util::FromEnv;

#[derive(Deserialize, Debug, Clone)]
pub struct CVConfig {
    pub data_dir: String,
}
impl FromEnv for CVConfig {}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CV {
    pub basics: Basics,
    pub work: Vec<Work>,
    pub education: Vec<Education>,
    pub skills: Skills,
    pub languages: Vec<Language>,
    pub interests: Interests,
    pub projects: Vec<Project>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Basics {
    pub name: String,
    pub label: String,
    pub email: String,
    pub images: Vec<String>,
    pub phone: String,
    pub website: String,
    pub summary: String,
    pub location: Location,
    pub profiles: Vec<Profile>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Location {
    pub city: String,
    pub region: String,
    pub country_code: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Profile {
    pub brand: Brand,
    pub url: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Brand {
    pub name: String,
    pub icon: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Work {
    pub company: String,
    pub position: String,
    pub website: String,
    pub start_date: String,
    pub end_date: String,
    pub summary: String,
    pub highlights: Vec<String>,
    pub logo: String,
    pub images: Vec<String>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Education {
    pub institution: String,
    pub area: String,
    pub study_type: String,
    pub start_date: String,
    pub end_date: String,
    pub grade: String,
    pub summary: String,
    pub images: Vec<String>,
    pub link: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Skills {
    pub summary: String,
    pub list: Vec<List>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct List {
    pub icon: String,
    pub name: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Language {
    pub language: String,
    pub fluency: String,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Interests {
    pub summary: String,
    pub list: Vec<String>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub name: String,
    pub link: String,
    pub image: String,
    pub summary: String,
    pub tags: Vec<String>,
    pub icon: Brand
}
