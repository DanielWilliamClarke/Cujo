// src/graphql/query.rs
use std::sync::Mutex;

use actix_web::web::Data;
use async_graphql::{Context, Object};

use crate::{
    blog::BlogEntries,
    cache::Cache,
    cv::CV,
};

pub struct Query;

#[Object]
impl Query {
    async fn cv(&self, ctx: &Context<'_>) -> CV {
        unwrap_cache(ctx).await.cv
    }

    async fn blog(&self, ctx: &Context<'_>) -> BlogEntries {
        unwrap_cache(ctx).await.blog
    }
}

async fn unwrap_cache(ctx: &Context<'_>) -> Cache {
    ctx.data::<Data<Mutex<Cache>>>()
        .ok()
        .unwrap()
        .lock()
        .unwrap()
        .clone()
}
