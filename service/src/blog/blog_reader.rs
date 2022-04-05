// src/blog/blog_reader.rs

use async_trait::async_trait;
use contentful::{
    models::{Asset, SystemProperties},
    ContentfulClient, Entries, QueryBuilder,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::util::Reader;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct BlogPost {
    id: String,
    title: String,
    content: Value,
    excerpt: Option<String>,
    media: Option<Asset>,
    tags: Vec<String>,
    sys: SystemProperties,
}

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

        let posts = self.client.get_entries::<BlogPost>(Some(builder)).await?;

        Ok(posts)
    }
}

#[cfg(test)]
mod tests {}
