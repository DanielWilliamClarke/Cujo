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
            self.get_cv_entries::<About>("interests"),
            self.get_cv_entries::<Work>("work"),
            self.get_cv_entries::<Education>("education"),
            self.get_cv_entries::<Skills>("skills"),
            self.get_cv_entries::<Project>("project"),
        )?;

        Ok(CV {
            about: self.extract_entry(about, 0),
            work,
            education,
            skills: self.extract_entry(skills, 0),
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

    fn extract_entry<T>(&self, entries: Option<Entries<T>>, index: usize) -> Option<Entry<T>>
    where
        T: Serialize + DeserializeOwned + Clone,
    {
        match entries {
            Some(Entries { entries, includes }) => Some(Entry {
                entry: entries[index].clone(),
                includes,
            }),
            None => None,
        }
    }
}

#[cfg(test)]
mod tests {}
