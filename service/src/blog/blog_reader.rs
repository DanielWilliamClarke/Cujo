// src/blog/blog_reader.rs

use std::time::Instant;

use async_trait::async_trait;
use contentful::{ContentfulClient, QueryBuilder, ContentfulClientErrors};

use crate::{blog::model::BlogPost, util::Reader, cv::CujoEntries};

pub struct BlogReader {
    client: Box<ContentfulClient>,
}

impl BlogReader {
    pub fn new(client: &ContentfulClient) -> Self {
        BlogReader {
            client: Box::new(client.to_owned()),
        }
    }
}

#[async_trait(?Send)]
impl Reader for BlogReader {
    type Data = CujoEntries<BlogPost>;
    type Error = ContentfulClientErrors;

    async fn get(&self) -> Result<Self::Data, Self::Error> {
        let builder = QueryBuilder::new().content_type_is("blogPost");

        let now = Instant::now();

        let results = match self.client.get_entries::<BlogPost>(Some(builder)).await {
            Ok(results) => Some(results),
            Err(err) => {
                match err {
                    ContentfulClientErrors::NoEntries => None,
                    err => {
                        eprintln!("Blog reader error: {}", err);
                        return Err(err)
                    }
                }
            }
        };

        let elapsed = now.elapsed();

        println!("BLOG READER - Elapsed: {:.2?}", elapsed);
        Ok(CujoEntries::from(results.unwrap()))
    }
}

#[cfg(test)]
mod tests {}
