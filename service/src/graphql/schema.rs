// src/graphql/schema.rs
use std::sync::Arc;

use actix_web::{web::Data};
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use tokio::sync::RwLock;

use super::Query;
use crate::cache::Cache;

#[derive(Clone)]
pub struct CujoSchema(pub Schema<Query, EmptyMutation, EmptySubscription>);

impl From<Data<Arc<RwLock<Cache>>>> for CujoSchema {
    fn from(cache: Data<Arc<RwLock<Cache>>>) -> Self {
        CujoSchema(
            Schema::build(Query, EmptyMutation, EmptySubscription)
            .data(cache)
            .finish()
        )
    }
}