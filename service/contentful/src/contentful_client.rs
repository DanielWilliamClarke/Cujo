// src/contentful_client.rs

use std::collections::HashMap;

use crate::{http_client, json_util::merge, query_builder::QueryBuilder};

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ContentfulResult<T> {
    pub entries: Vec<T>,
    pub includes: Option<Value>,
}

pub struct ContentfulClient {
    delivery_api_access_token: String,
    space_id: String,
    base_url: String,
    environment_id: String,
}

impl ContentfulClient {
    pub fn new(delivery_api_access_token: &str, space_id: &str, environment_id: &str) -> Self {
        ContentfulClient {
            base_url: "https://cdn.contentful.com/spaces".into(),
            delivery_api_access_token: delivery_api_access_token.into(),
            space_id: space_id.into(),
            environment_id: environment_id.into(),
        }
    }

    pub async fn get_entries<T>(
        &self,
        query_builder: Option<QueryBuilder>,
    ) -> Result<Option<ContentfulResult<T>>, Box<dyn std::error::Error>>
    where
        for<'a> T: Serialize + Deserialize<'a>,
    {
        let query_string = match query_builder {
            Some(builder) => builder.build(),
            None => "".to_string(),
        };

        self.get_entries_by_query_string::<T>(query_string.as_str())
            .await
    }

    fn get_query_string_url(&self, query_string: &str) -> String {
        format!(
            "{base_url}/{space_id}/environments/{environment}/entries{query_string}",
            base_url = &self.base_url,
            space_id = &self.space_id,
            environment = &self.environment_id,
            query_string = &query_string
        )
    }

    async fn get_entries_by_query_string<T>(
        &self,
        query_string: &str,
    ) -> Result<Option<ContentfulResult<T>>, Box<dyn std::error::Error>>
    where
        for<'a> T: Serialize + Deserialize<'a>,
    {
        log::debug!("query_string: {:?}", &query_string);
        let url = self.get_query_string_url(query_string);

        let response =
            match http_client::get::<Value>(&url, &self.delivery_api_access_token).await? {
                Some(json) => json,
                None => json!({}),
            };

        let includes = match response.clone().get("includes") {
            Some(includes) => Some(includes.clone().to_owned()),
            None => None,
        };

        match response.clone().get_mut("items") {
            Some(items) => {
                if items.is_array() {
                    if let Some(ref includes) = includes {
                        self.resolve_array(items, includes)
                    }

                    let entries = items.to_string();
                    let entries = serde_json::from_str::<Vec<T>>(&entries.as_str())?;

                    Ok(Some(ContentfulResult { entries, includes }))
                } else {
                    Ok(None)
                }
            }
            None => Ok(None),
        }
    }

    fn resolve_array(&self, value: &mut Value, includes: &Value) {
        for item in value.as_array_mut().unwrap() {
            if item.is_object() {
                self.resolve_object(item, &includes);
            } else if item.is_string() || item.is_number() {
                // do nothing
            } else {
                log::error!("Unimplemented item {}", &item);
                unimplemented!();
            }
        }
    }

    fn resolve_object(&self, value: &mut Value, includes: &Value) {
        match value["sys"]["type"].clone() {
            Value::String(sys_type) => match sys_type.as_str() {
                "Entry" => self.resolve_entry(value, includes),
                "Link" => self.resolve_link(value, includes),
                _ => (),
            },
            _ => (),
        };
    }

    fn resolve_entry(&self, value: &mut Value, includes: &Value) {
        let sys = match value.get_mut("sys") {
            Some(sys) => {
                let mut map = HashMap::new();
                map.insert("sys".to_string(), sys.clone());
                map
            }
            None => HashMap::new(),
        };

        let fields = match value.get_mut("fields") {
            Some(fields) => {
                if fields.is_object() {
                    for (_, field_value) in fields.as_object_mut().unwrap() {
                        if field_value.is_object() {
                            self.resolve_object(field_value, &includes);
                        } else if field_value.is_array() {
                            self.resolve_array(field_value, &includes);
                        } else {
                            // Regular string, number, etc, values. No need to do anything.
                        }
                    }
                };

                fields.clone()
            }
            None => json!({}),
        };

        *value = merge(&fields, &sys);
    }

    fn resolve_link(&self, value: &mut Value, includes: &Value) {
        let link_id = value["sys"]["id"].clone();

        *value = match value["sys"]["linkType"].clone() {
            Value::String(link_type) => match link_type.as_str() {
                "Entry" => self.find_item(&link_type, &link_id, &includes, |entry, includes| {
                    self.resolve_entry(entry, includes)
                }),
                "Asset" => self.find_item(&link_type, &link_id, &includes, |asset, _| {
                    self.resolve_asset(asset)
                }),
                _ => json!({}),
            },
            _ => json!({}),
        };
    }

    fn resolve_asset(&self, value: &mut Value) {
        match value.get_mut("fields") {
            Some(fields) => {
                if fields.is_object() {
                    *value = fields.clone();
                };
            }
            None => (),
        };
    }

    fn find_item<F>(&self, key: &str, link_id: &Value, includes: &Value, resolver: F) -> Value
    where
        F: Fn(&mut Value, &Value),
    {
        let mut filtered_items = includes[key]
            .as_array()
            .unwrap()
            .iter()
            .filter(|entry| entry["sys"]["id"].to_string() == link_id.to_string())
            .take(1);

        match filtered_items.next() {
            Some(entry) => {
                let mut entry = entry.clone();
                resolver(&mut entry, includes);
                entry
            }
            None => json!({}),
        }
    }
}
