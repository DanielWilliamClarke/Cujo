// src/blog/blog_reader.rs

use contentful::{ContentfulClient, Entries, QueryBuilder};
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
            self.get_cv_entries::<About>("interests"),
            self.get_cv_entries::<Work>("work"),
            self.get_cv_entries::<Education>("education"),
            self.get_cv_entries::<Skills>("skills"),
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

    async fn get_cv_entries<T>(
        &self,
        entries_type: &str,
    ) -> Result<Option<Entries<T>>, Box<dyn std::error::Error>>
    where
        T: Serialize + DeserializeOwned,
    {
        let builder = QueryBuilder::new().content_type_is(entries_type).include(2);

        self.client.get_entries::<T>(Some(builder)).await
    }
}

#[cfg(test)]
mod tests {}
