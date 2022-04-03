// src/blog/blog_reader.rs

use contentful::{
    models::{Asset, SystemProperties},
    ContentfulClient, Entries, QueryBuilder,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Brand {
    name: String,
    icon: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Profile {
    url: String,
    brand: Brand,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct About {
    name: String,
    label: String,
    email: String,
    phone: String,
    website: String,
    about: Value,
    interests: Value,
    images: Vec<Asset>,
    profiles: Vec<Profile>,
    sys: SystemProperties,
}

pub struct CVReader<'a> {
    client: &'a ContentfulClient,
}

impl<'a> CVReader<'a> {
    pub fn new(client: &'a ContentfulClient) -> Self {
        CVReader { client }
    }

    pub async fn get_about(&self) -> Result<Option<Entries<About>>, Box<dyn std::error::Error>> {
        let builder = QueryBuilder::new().content_type_is("interests").include(2);

        let about = self.client.get_entries::<About>(Some(builder)).await?;

        Ok(about)
    }
}

#[cfg(test)]
mod tests {}
