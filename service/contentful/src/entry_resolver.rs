use serde_json::{Value, Map};
use std::collections::HashMap;
use crate::json_util::merge;

pub trait Resolver {
    fn resolve(&self, includes: &Value) -> Value;
}

pub struct IncludesResolver<'a>(&'a Value);

impl<'a> From<&'a Value> for IncludesResolver<'a> {
    fn from(value: &'a Value) -> Self {
        IncludesResolver(value)
    }
}

impl<'a> Resolver for IncludesResolver<'a> { 
    fn resolve(&self, includes: &Value) -> Value {
        self.0
            .as_array()
            .unwrap()
            .iter() 
            .map(|item| match item {
                Value::Object(_) => self.resolve_object(item, includes),
                Value::Array(_) => IncludesResolver::from(item).resolve(includes),
                _ => item.clone(),
            }) 
            .collect::<Value>()
    }
}

impl<'a> IncludesResolver<'a> {
    fn resolve_object(&self, value: &Value, includes: &Value) -> Value {
        match value["sys"]["type"].clone() {
            Value::String(sys_type) if sys_type == "Entry" => self.resolve_entry(value, includes),
            Value::String(sys_type) if sys_type == "Link" => self.resolve_link(value, includes),
            _ => value.clone(),
        }
    }

    fn resolve_entry(&self, value: &Value, includes: &Value) -> Value  {
        let fields = match value.get("fields") {
            Some(fields) if fields.is_object() => {
                let fields = fields
                    .as_object()
                    .unwrap()
                    .iter()
                    .fold(Map::new(), |mut acc, (key, field)| {
                        let field = match field {
                            Value::Object(_) => self.resolve_object(field, includes),
                            Value::Array(_) => IncludesResolver::from(field).resolve(includes),
                            _ => field.clone(),
                        };

                        acc.insert(key.to_string(), field);

                        acc  
                });

                Value::Object(fields)
            }
            _ => Value::Null,
        };

        let sys = match value.get("sys") {
            Some(sys) => {
                let mut map = HashMap::new();
                map.insert("sys".to_string(), sys.clone());
                map
            }
            None => HashMap::new(),
        };

        merge(&fields, &sys)
    }

    fn resolve_link(&self, value: &Value, includes: &Value) -> Value {
        let link_id = value["sys"]["id"].clone();

        match value["sys"]["linkType"].clone() {
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
        }
    }

    fn resolve_asset(&self, value: &Value) -> Value {
        match value.get("fields") {
            Some(fields) if fields.is_object() => fields.clone(),
            _ => Value::Null,
        }
    }

    fn find_item<F>(&self, key: &str, link_id: &Value, includes: &Value, resolver: F) -> Value
    where
        F: Fn(&Value, &Value) -> Value,
    {
        let item = includes[key]
            .as_array()
            .unwrap()
            .iter()
            .find(|entry| entry["sys"]["id"] == *link_id);

        match item {
            Some(entry) => resolver(&entry, includes),
            None => Value::Null,
        }
    }
}