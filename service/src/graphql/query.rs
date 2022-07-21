use std::sync::Mutex;

use actix_web::web::Data;
use async_graphql::{Object, Context};

use crate::{cv::{CV, AboutEntry, WorkEntries, EducationEntries, SkillsEntry, ProjectEntries}, blog::BlogEntries, cache::Cache};

pub struct Query;

#[Object]
impl Query {
    async fn about(&self, ctx: &Context<'_>) -> AboutEntry {
       unwrap_cv(ctx).await.about
    }

    async fn work(&self, ctx: &Context<'_>) -> WorkEntries {
        unwrap_cv(ctx).await.work
    }

    async fn education(&self, ctx: &Context<'_>) -> EducationEntries {
        unwrap_cv(ctx).await.education
    }

    async fn skills(&self, ctx: &Context<'_>) -> SkillsEntry {
        unwrap_cv(ctx).await.skills
    }

    async fn projects(&self, ctx: &Context<'_>) -> ProjectEntries {
        unwrap_cv(ctx).await.projects
    }

    async fn blog(&self, ctx: &Context<'_>) -> BlogEntries {
        ctx.data::<Data<Mutex<Cache>>>()
        .ok()
        .unwrap()
        .lock()
        .unwrap()
        .blog.clone() 
    }
}

async fn unwrap_cv(ctx: &Context<'_>) -> CV {
    ctx.data::<Data<Mutex<Cache>>>()
   .ok()
   .unwrap()
   .lock()
   .unwrap()
   .cv.
   clone()
}
