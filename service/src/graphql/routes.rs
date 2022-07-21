// src/graphql/routes.rs

use actix_web::{web, HttpResponse, Responder};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_actix_web::{GraphQLRequest, GraphQLResponse};

use super::schema::AppSchema;

struct GraphQL;

impl GraphQL {
    async fn graphql(schema: web::Data<AppSchema>, req: GraphQLRequest) -> GraphQLResponse {
        schema.execute(req.into_inner()).await.into()
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
    cfg.service(web::resource("/graphql").route(web::post().to(GraphQL::graphql)))
        .service(web::resource("/graphiql").route(web::get().to(GraphQL::graphql_playground)));
}
