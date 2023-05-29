// src/cv/model.rs

use async_graphql::SimpleObject;
use contentful::models::Asset;
use contentful::{Entries, Entry};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use crate::blog::BlogPost;

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
#[graphql(concrete(name = "AboutEntry", params(About)))]
#[graphql(concrete(name = "SkillsEntry", params(Skills)))]
pub struct CujoEntry<T> 
where 
    T: std::marker::Send + std::marker::Sync + async_graphql::OutputType
{
    pub entry: T,
    pub includes: Option<Value>,
}

impl<T> Into<CujoEntry<T>> for Entry<T>
where 
    T: std::marker::Send + std::marker::Sync + async_graphql::OutputType
{
    fn into(self) -> CujoEntry<T> {
        CujoEntry { entry: self.entry, includes: self.includes }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
#[graphql(concrete(name = "WorkEntries", params(Work)))]
#[graphql(concrete(name = "EducationEntries", params(Education)))]
#[graphql(concrete(name = "ProjectEntries", params(Project)))]
#[graphql(concrete(name = "BlogEntries", params(BlogPost)))]
#[graphql(concrete(name = "ReadingListEntries", params(Book)))]
pub struct CujoEntries<T>
where 
    T: std::marker::Send + std::marker::Sync + async_graphql::OutputType
{
    pub entries: Vec<T>,
    pub includes: Option<Value>,
}

impl<T> Into<CujoEntries<T>> for Entries<T>
where 
    T: std::marker::Send + std::marker::Sync + async_graphql::OutputType
{
    fn into(self) -> CujoEntries<T> {
        CujoEntries { entries: self.entries, includes: self.includes }
    }
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct CV {
    pub about: CujoEntry<About>,
    pub work: CujoEntries<Work>,
    pub education: CujoEntries<Education>,
    pub skills: CujoEntry<Skills>,
    pub projects: CujoEntries<Project>,
    pub reading_list: CujoEntries<Book>
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
    pub hide_from_cv: Option<bool>,
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
#[serde(rename_all = "camelCase")]
pub struct Book {
    pub title: String,
    pub cover: Asset,
    pub author: String,
    pub progress: String,
    pub amazon_link: Option<String>,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
pub struct Profile {
    pub url: String,
    pub brand: DevIcon,
}

#[derive(SimpleObject, Serialize, Deserialize, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct DevIcon {
    pub name: String,
    pub icon: String,
    pub icon_image: Option<Asset>
}
