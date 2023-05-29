// src/blog/blog_reader.rs

use std::time::Instant;

use async_trait::async_trait;
use contentful::{ContentfulClient, Entries, Entry, QueryBuilder, ContentfulClientErrors};
use futures::try_join;
use serde::{de::DeserializeOwned, Serialize};

use super::{About, Book, Education, Project, Skills, Work, CV};
use crate::{
    cv::{CujoEntry, CujoEntries},
    util::Reader,
};

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
    ) -> Result<Option<Entries<T>>, ContentfulClientErrors>
    where
        T: Serialize + DeserializeOwned,
    {
        match self.client
            .get_entries::<T>(self.build_query(entries_type))
            .await {
                Ok(entries) => Ok(Some(entries)),
                Err(err) => {
                    match err {
                        ContentfulClientErrors::NoEntries =>  Ok(None),
                        err => {
                            eprintln!("CV reader error: {}", err);
                            return Err(err)
                        }
                    }
                },
            }
    }

    async fn get_cv_entry<T>(
        &self,
        entries_type: &str,
        index: usize,
    ) -> Result<Option<Entry<T>>, ContentfulClientErrors>
    where
        T: Serialize + DeserializeOwned + Clone,
    {
        match self.client
            .get_entry::<T>(self.build_query(entries_type), index)
            .await {
                Ok(entry) => Ok(Some(entry)),
                Err(err) => {
                    match err {
                        ContentfulClientErrors::NoEntries => Ok(None),
                        err => {
                            eprintln!("Reading {} entries: {}", entries_type, err);
                            return Err(err)
                        }
                    }
                },
            }
    }
}

#[async_trait(?Send)]
impl Reader for CVReader {
    type Data = CV;
    type Error = ContentfulClientErrors;

    async fn get(&self) -> Result<Self::Data, Self::Error> {
        let now = Instant::now();

        let results = try_join!(
            self.get_cv_entry::<About>("interests", 0),
            self.get_cv_entries::<Work>("work"),
            self.get_cv_entries::<Education>("education"),
            self.get_cv_entry::<Skills>("skills", 0),
            self.get_cv_entries::<Project>("project"),
            self.get_cv_entries::<Book>("readingList")
        );

        let (about, work, education, skills, projects, books) = match results {
            Ok(results) => results,
            Err(err) => {
                eprintln!("CV reader error: {}", err);
                return Err(err)
            }
        };

        let elapsed = now.elapsed();

        println!("CV READER - Elapsed: {:.2?}", elapsed);
        Ok(CV {
            about: CujoEntry::from(about.unwrap()),
            work: CujoEntries::from(work.unwrap()),
            education: CujoEntries::from(education.unwrap()),
            skills: CujoEntry::from(skills.unwrap()),
            projects: CujoEntries::from(projects.unwrap()),
            reading_list: CujoEntries::from(books.unwrap())
        })
    }
}

#[cfg(test)]
mod tests {}
