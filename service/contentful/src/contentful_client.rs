// src/contentful_client.rs

use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;

use crate::{
    http_client,
    QueryBuilder,
    ContentfulClientErrors,
    Entries,
    Entry,
    entry_resolver::{IncludesResolver, Resolver}
};

#[derive(Deserialize, Debug, Clone)]
pub struct ContentfulConfig {
    access_token: String,
    space_id: String,
    environment: String,
}

#[derive(Clone)]
pub struct ContentfulClient {
    config: ContentfulConfig,
    base_url: String,
}

impl From<ContentfulConfig> for ContentfulClient {
    fn from(config: ContentfulConfig) -> Self {
        ContentfulClient {
            config,
            base_url: "https://cdn.contentful.com/spaces".into(),
        }
    }
}

impl ContentfulClient {
    pub async fn get_entry<T>(
        &self,
        query_builder: Option<QueryBuilder>,
        index: usize,
    ) -> Result<Entry<T>, ContentfulClientErrors>
    where
        T: Serialize + DeserializeOwned + Clone,
    {
        match self.get_entries::<T>(query_builder).await {
            Ok(Entries { entries, includes }) => Ok(Entry {
                entry: entries[index].clone(),
                includes,
            }),
            Err(err) => Err(err),
        }
    }

    pub async fn get_entries<T>(
        &self,
        query_builder: Option<QueryBuilder>,
    ) -> Result<Entries<T>, ContentfulClientErrors>
    where
        T: Serialize + DeserializeOwned,
    {
        self.get_entries_by_query_string::<T>(query_builder).await
    }

    async fn get_entries_by_query_string<T>(
        &self,
        query_builder: Option<QueryBuilder>,
    ) -> Result<Entries<T>, ContentfulClientErrors>
    where
        for<'a> T: Serialize + DeserializeOwned,
    {
        let url = self.query_string_url(query_builder);

        let response = match http_client::get::<Value>(&url, &self.config.access_token).await {
            Ok(response) => match response {
                Some(response) => response,
                None => Value::Null,
            },
            Err(err) => return Err(err),
        };

        let includes = response.get("includes").cloned();

        match response.get("items") {
            Some(entries) if entries.is_array() => {
                let entries = if let Some(ref includes) = includes {
                    
                    IncludesResolver::from(entries).resolve(includes)
                } else {
                    entries.clone()
                };

                match serde_json::from_value::<Vec<T>>(entries) {
                    Ok(entries) =>   Ok(Entries { entries, includes }),
                    Err(err) => Err(ContentfulClientErrors::Deserialization(err)),
                }
            }
            _ => Err(ContentfulClientErrors::NoEntries),
        }
    }

    fn query_string_url(&self, query_builder: Option<QueryBuilder>) -> String {
        format!(
            "{base_url}/{space_id}/environments/{environment}/entries{query_string}",
            base_url = &self.base_url,
            space_id = &self.config.space_id,
            environment = &self.config.environment,
            query_string = &query_builder.unwrap_or_default().to_string()
        )
    }
}