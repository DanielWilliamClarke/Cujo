// src/blog/blog_reader.rs

use contentful::{ContentfulClient, Entries, Entry, QueryBuilder};
use futures::try_join;
use serde::{de::DeserializeOwned, Serialize};

use super::{About, Education, Project, Skills, Work, CV};

pub struct CVReader<'a> {
    client: &'a ContentfulClient,
}

impl<'a> CVReader<'a> {
    pub fn new(client: &'a ContentfulClient) -> Self {
        CVReader { client }
    }

    pub async fn get_cv(&self) -> Result<CV, Box<dyn std::error::Error>> {
        let (about, work, education, skills, projects) = try_join!(
            self.get_cv_entry::<About>("interests", 0),
            self.get_cv_entries::<Work>("work"),
            self.get_cv_entries::<Education>("education"),
            self.get_cv_entry::<Skills>("skills", 0),
            self.get_cv_entries::<Project>("project"),
        )?;

        Ok(CV {
            about,
            work,
            education,
            skills,
            projects,
        })
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

#[cfg(test)]
mod tests {}
