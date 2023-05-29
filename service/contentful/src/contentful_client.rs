// src/contentful_client.rs

use std::collections::HashMap;

use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;

use crate::{http_client, json_util::merge, query_builder::QueryBuilder, ContentfulClientErrors, Entries, Entry};

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

impl ContentfulClient {
    pub fn new(config: ContentfulConfig) -> Self {
        ContentfulClient {
            config,
            base_url: "https://cdn.contentful.com/spaces".into(),
        }
    }

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
        let url = self.get_query_string_url(query_builder);

        let mut response = match http_client::get::<Value>(&url, &self.config.access_token).await {
            Ok(response) => match response {
                Some(response) => response,
                None => Value::Null,
            },
            Err(err) => return Err(err),
        };

        let includes = response.get("includes").cloned();

        match response.get_mut("items") {
            Some(items) if items.is_array() => {
                if let Some(ref includes) = includes {
                    self.resolve_array(items, includes)
                }

                match serde_json::from_str::<Vec<T>>(items.to_string().as_str()) {
                    Ok(entries) => Ok(Entries { entries, includes }),
                    Err(err) => Err(ContentfulClientErrors::Deserialization(err)),
                }
            }
            _ => Err(ContentfulClientErrors::NoEntries),
        }
    }

    fn get_query_string_url(&self, query_builder: Option<QueryBuilder>) -> String {
        format!(
            "{base_url}/{space_id}/environments/{environment}/entries{query_string}",
            base_url = &self.base_url,
            space_id = &self.config.space_id,
            environment = &self.config.environment,
            query_string = &query_builder.unwrap_or_default().to_string()
        )
    }

    fn resolve_array(&self, value: &mut Value, includes: &Value) {
        value
            .as_array_mut()
            .unwrap()
            .iter_mut()
            .for_each(|item| match item {
                Value::Object(_) => self.resolve_object(item, includes),
                Value::Number(_) | Value::String(_) => (),
                _ => {
                    log::error!("Unimplemented item {}", &item);
                    unimplemented!();
                }
            });
    }

    fn resolve_object(&self, value: &mut Value, includes: &Value) {
        match value["sys"]["type"].clone() {
            Value::String(sys_type) if sys_type == "Entry" => self.resolve_entry(value, includes),
            Value::String(sys_type) if sys_type == "Link" => self.resolve_link(value, includes),
            _ => (),
        };
    }

    fn resolve_entry(&self, value: &mut Value, includes: &Value) {
        let fields = match value.get_mut("fields") {
            Some(fields) if fields.is_object() => {
                fields
                    .as_object_mut()
                    .unwrap()
                    .iter_mut()
                    .for_each(|(_, field)| match field {
                        Value::Object(_) => self.resolve_object(field, includes),
                        Value::Array(_) => self.resolve_array(field, includes),
                        _ => (),
                    });

                fields.clone()
            }
            _ => Value::Null,
        };

        let sys = match value.get_mut("sys") {
            Some(sys) => {
                let mut map = HashMap::new();
                map.insert("sys".to_string(), sys.clone());
                map
            }
            None => HashMap::new(),
        };

        *value = merge(&fields, &sys);
    }

    fn resolve_link(&self, value: &mut Value, includes: &Value) {
        let link_id = value["sys"]["id"].clone();

        *value = match value["sys"]["linkType"].clone() {
            Value::String(link_type) if link_type == "Entry" => {
                self.find_item(&link_type, &link_id, includes, |entry, includes| {
                    self.resolve_entry(entry, includes)
                })
            }
            Value::String(link_type) if link_type == "Asset" => {
                self.find_item(&link_type, &link_id, includes, |asset, _| {
                    self.resolve_asset(asset)
                })
            }
            _ => Value::Null,
        };
    }

    fn resolve_asset(&self, value: &mut Value) {
        *value = match value.get_mut("fields") {
            Some(fields) if fields.is_object() => fields.clone(),
            _ => Value::Null,
        };
    }

    fn find_item<F>(&self, key: &str, link_id: &Value, includes: &Value, resolver: F) -> Value
    where
        F: Fn(&mut Value, &Value),
    {
        let item = includes[key]
            .as_array()
            .unwrap()
            .iter()
            .find(|entry| entry["sys"]["id"] == *link_id);

        match item {
            Some(entry) => {
                let mut entry = entry.clone();
                resolver(&mut entry, includes);
                entry
            }
            None => Value::Null,
        }
    }
}
