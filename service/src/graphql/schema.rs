// src/graphql/schema.rs
use std::sync::RwLock;

use actix_web::web::Data;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};

use super::Query;
use crate::cache::Cache;

pub(crate) type AppSchema = Schema<Query, EmptyMutation, EmptySubscription>;

pub fn create_schema_with_cache(cache: Data<RwLock<Cache>>) -> AppSchema {
    Schema::build(Query, EmptyMutation, EmptySubscription)
        .data(cache)
        .finish()
}
