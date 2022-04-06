// src/blog/blog_reader.rs

use async_trait::async_trait;
use contentful::{ContentfulClient, Entries, QueryBuilder};

use super::BlogPost;
use crate::util::Reader;

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
    type Data = Option<Entries<BlogPost>>;

    async fn get(&self) -> Result<Self::Data, Self::Error> {
        let builder = QueryBuilder::new().content_type_is("blogPost");

        Ok(self.client.get_entries::<BlogPost>(Some(builder)).await?)
    }
}

#[cfg(test)]
mod tests {}
