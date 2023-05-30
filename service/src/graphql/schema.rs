// src/graphql/schema.rs
use std::sync::RwLock;

use actix_web::{web::Data};
use async_graphql::{EmptyMutation, EmptySubscription, Schema};

use super::Query;
use crate::cache::Cache;

#[derive(Clone)]
pub struct CujoSchema(pub Schema<Query, EmptyMutation, EmptySubscription>);

impl From<Data<RwLock<Cache>>> for CujoSchema {
    fn from(cache: Data<RwLock<Cache>>) -> Self {
        CujoSchema(
            Schema::build(Query, EmptyMutation, EmptySubscription)
            .data(cache)
            .finish()
        )
    }
}