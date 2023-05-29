// src/graphql/query.rs
use std::sync::RwLock;

use actix_web::web::Data;
use async_graphql::{Context, Object};

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
    ctx.data::<Data<RwLock<Cache>>>()
        .ok()
        .unwrap()
        .read()
        .unwrap()
        .clone()
}
