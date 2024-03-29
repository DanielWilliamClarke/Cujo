// src/graphql/query.rs

use std::sync::Arc;

use actix_web::web::Data;
use async_graphql::{Context, Object};
use tokio::sync::RwLock;

use crate::{
    blog::BlogPost,
    cache::Cache,
    cv::{CV, CujoEntries},
};

pub struct Query;

#[Object]
impl Query {
    async fn cv(&self, ctx: &Context<'_>) -> CV {
        unwrap_cache(ctx).await.cv
    }

    async fn blog(&self, ctx: &Context<'_>) -> CujoEntries<BlogPost> {
        unwrap_cache(ctx).await.blog
    }
}

async fn unwrap_cache(ctx: &Context<'_>) -> Cache {
    ctx.data::<Data<Arc<RwLock<Cache>>>>()
        .ok()
        .unwrap()
        .read()
        .await
        .clone()
}
