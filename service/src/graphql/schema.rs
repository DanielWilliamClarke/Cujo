// src/graphql/schema.rs
use std::sync::Arc;

use actix_web::{web::Data};
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use tokio::sync::Mutex;

use super::Query;
use crate::cache::Cache;

#[derive(Clone)]
pub struct CujoSchema(pub Schema<Query, EmptyMutation, EmptySubscription>);

impl From<Data<Arc<Mutex<Cache>>>> for CujoSchema {
    fn from(cache: Data<Arc<Mutex<Cache>>>) -> Self {
        CujoSchema(
            Schema::build(Query, EmptyMutation, EmptySubscription)
            .data(cache)
            .finish()
        )
    }
}