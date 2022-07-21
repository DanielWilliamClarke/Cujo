use std::sync::Mutex;

use actix_web::web::Data;
use async_graphql::{Schema, EmptyMutation, EmptySubscription};

use crate::cache::Cache;

use super::Query;

pub(crate) type AppSchema = Schema<Query, EmptyMutation, EmptySubscription>;

pub fn create_schema_with_cache(cache: Data<Mutex<Cache>>) -> Schema<Query, EmptyMutation, EmptySubscription> {
    Schema::build(Query, EmptyMutation, EmptySubscription)
        .data(cache)
        .finish()
}