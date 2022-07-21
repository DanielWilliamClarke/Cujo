// src/blog/blog_reader.rs

use std::time::Instant;

use async_trait::async_trait;
use contentful::{ContentfulClient, Entries, Entry, QueryBuilder};
use futures::try_join;
use serde::{de::DeserializeOwned, Serialize};

use super::{About, Education, Project, Skills, Work, CV};
use crate::{util::Reader, cv::{model::AboutEntry, WorkEntries, EducationEntries, SkillsEntry, ProjectEntries}};

pub struct CVReader {
    client: Box<ContentfulClient>,
}

impl CVReader {
    pub fn new(client: &ContentfulClient) -> Self {
        CVReader {
            client: Box::new(client.to_owned()),
        }
    }

    fn build_query(&self, entries_type: &str) -> Option<QueryBuilder> {
        Some(QueryBuilder::new().content_type_is(entries_type).include(2))
    }

    async fn get_cv_entries<T>(
        &self,
        entries_type: &str,
    ) -> Result<Option<Entries<T>>, Box<dyn std::error::Error>>
    where
        T: Serialize + DeserializeOwned,
    {
        self.client
            .get_entries::<T>(self.build_query(entries_type))
            .await
    }

    async fn get_cv_entry<T>(
        &self,
        entries_type: &str,
        index: usize,
    ) -> Result<Option<Entry<T>>, Box<dyn std::error::Error>>
    where
        T: Serialize + DeserializeOwned + Clone,
    {
        self.client
            .get_entry::<T>(self.build_query(entries_type), index)
            .await
    }
}

#[async_trait(?Send)]
impl Reader for CVReader {
    type Data = CV;

    async fn get(&self) -> Result<Self::Data, Self::Error> {
        let now = Instant::now();
        let (about, work, education, skills, projects) = try_join!(
            self.get_cv_entry::<About>("interests", 0),
            self.get_cv_entries::<Work>("work"),
            self.get_cv_entries::<Education>("education"),
            self.get_cv_entry::<Skills>("skills", 0),
            self.get_cv_entries::<Project>("project"),
        )?;
        let elapsed = now.elapsed();

        println!("CV READER - Elapsed: {:.2?}", elapsed);
        Ok(CV {
           about: AboutEntry::new(about.unwrap()),
           work: WorkEntries::new(work.unwrap()),
           education: EducationEntries::new(education.unwrap()),
           skills: SkillsEntry::new(skills.unwrap()),
           projects: ProjectEntries::new(projects.unwrap()),
        })
    }
}

#[cfg(test)]
mod tests {}
