// src/query_builder.rs

use std::collections::HashMap;

#[derive(Default)]
pub struct QueryBuilder {
    query_string_values: HashMap<String, String>,
}

impl ToString for QueryBuilder {
    fn to_string(&self) -> String {
        let qs = self.query_string_values.iter().enumerate().fold(
            String::new(),
            |acc, (index, (key, value))| {
                let delimiter = match index {
                    0 => "?",
                    _ => "&",
                };

                format!("{acc}{delimiter}{key}={value}")
            },
        );

        log::debug!("query_string: {}", &qs);

        qs
    }
}

impl QueryBuilder {
    pub fn new() -> QueryBuilder {
        QueryBuilder {
            query_string_values: HashMap::new(),
        }
    }

    pub fn content_type_is(mut self, content_type_id: &str) -> QueryBuilder {
        self.query_string_values
            .insert("content_type".into(), content_type_id.into());
        self
    }

    pub fn order_by(mut self, order: &str) -> QueryBuilder {
        self.query_string_values
            .insert("order".into(), order.into());
        self
    }

    pub fn limit(mut self, limit: i32) -> QueryBuilder {
        self.query_string_values
            .insert("order".to_string(), limit.to_string());
        self
    }

    pub fn skip(mut self, skip: i32) -> QueryBuilder {
        self.query_string_values
            .insert("skip".to_string(), skip.to_string());
        self
    }

    pub fn include(mut self, level: i32) -> QueryBuilder {
        self.query_string_values
            .insert("include".into(), level.to_string());
        self
    }

    pub fn locale_is(mut self, locale: &str, value: &str) -> QueryBuilder {
        self.query_string_values.insert(locale.into(), value.into());
        self
    }

    pub fn field_equals(mut self, field: &str, value: &str) -> QueryBuilder {
        self.query_string_values.insert(field.into(), value.into());
        self
    }

    pub fn field_does_not_equal(mut self, field: &str, value: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, value, "[ne]");
        self
    }

    pub fn field_equals_all(mut self, field: &str, values: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, values, "[all]");
        self
    }

    pub fn field_includes(mut self, field: &str, values: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, values, "[in]");
        self
    }

    pub fn field_excludes(mut self, field: &str, values: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, values, "[nin]");
        self
    }

    pub fn field_exists(mut self, field: &str, must_exist: bool) -> QueryBuilder {
        let key = format!("{}[exists]", field);
        self.query_string_values.insert(key, must_exist.to_string());
        self
    }

    pub fn field_less_than(mut self, field: &str, value: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, value, "[lt]");
        self
    }

    pub fn field_less_than_or_equal_to(mut self, field: &str, value: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, value, "[lte]");
        self
    }

    pub fn field_greater_than(mut self, field: &str, value: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, value, "[gt]");
        self
    }

    pub fn field_greater_than_or_equal_to(mut self, field: &str, value: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, value, "[gte]");
        self
    }

    pub fn field_matches(mut self, field: &str, value: &str) -> QueryBuilder {
        self = self.add_field_restriction(field, value, "[match]");
        self
    }

    pub fn links_to_entry(mut self, id: &str) -> QueryBuilder {
        self = self.add_field_restriction("links_to_entry", id, "");
        self
    }

    pub fn links_to_asset(mut self, id: &str) -> QueryBuilder {
        self = self.add_field_restriction("links_to_asset", id, "");
        self
    }

    pub fn add_field_restriction(
        mut self,
        field: &str,
        value: &str,
        operator: &str,
    ) -> QueryBuilder {
        let key = format!("{}{}", field, operator);
        self.query_string_values.insert(key, value.into());
        self
    }
}
