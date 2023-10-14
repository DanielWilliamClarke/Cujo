// src/graphql/routes.rs

use actix_web::{web, HttpResponse, Responder};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use super::schema::CujoSchema;

struct GraphQL;

impl GraphQL {
    async fn status() -> impl Responder {
        HttpResponse::Ok().body("Ok")
    }

    async fn graphql(schema: web::Data<CujoSchema>, req: GraphQLRequest) -> GraphQLResponse {
        schema.0.execute(req.into_inner()).await.into()
    }

    async fn graphql_playground() -> impl Responder {
        HttpResponse::Ok()
            .content_type("text/html; charset=utf-8")
            .body(playground_source(
                GraphQLPlaygroundConfig::new("/").subscription_endpoint("/"),
            ))
    }
}

pub fn configure_graphql_service(cfg: &mut web::ServiceConfig) {
    cfg.service(web::resource("/").route(web::post().to(GraphQL::graphql)))
        .service(web::resource("/playground").route(web::get().to(GraphQL::graphql_playground)))
        .service(web::resource("/status").route(web::get().to(GraphQL::status)));
}
