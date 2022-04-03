// src/blog/blog_reader.rs

use contentful::{
    models::{Asset, SystemProperties},
    ContentfulClient, Entries, QueryBuilder,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;

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

pub struct BlogReader<'a> {
    client: &'a ContentfulClient,
}

impl<'a> BlogReader<'a> {
    pub fn new(client: &'a ContentfulClient) -> Self {
        BlogReader { client }
    }

    pub async fn get_entries(
        &self,
    ) -> Result<Option<Entries<BlogPost>>, Box<dyn std::error::Error>> {
        let builder = QueryBuilder::new().content_type_is("blogPost");

        let posts = self.client.get_entries::<BlogPost>(Some(builder)).await?;

        Ok(posts)
    }
}

#[cfg(test)]
mod tests {}
