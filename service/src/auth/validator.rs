// src/auth/validator.rs

use actix_web::dev::ServiceRequest;
use actix_web::{error::ResponseError, Error, HttpResponse};
use actix_web_httpauth::extractors::bearer::{BearerAuth, Config};
use actix_web_httpauth::extractors::AuthenticationError;
use alcoholic_jwt::{token_kid, validate, Validation, JWKS};
use derive_more::Display;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    company: String,
    exp: usize,
}

#[derive(Debug, Display)]
enum ServiceError {
    #[display(fmt = "JWKSFetchError")]
    JWKSFetchError,
    #[display(fmt = "KidError")]
    KidError,
    #[display(fmt = "NotPresentError")]
    NotPresentError,
    #[display(fmt = "InvalidTokenError")]
    InvalidTokenError,
}

// impl ResponseError trait allows to convert our errors into http responses with appropriate data
impl ResponseError for ServiceError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ServiceError::JWKSFetchError => {
                HttpResponse::InternalServerError().json("Could not fetch JWKS")
            }
            ServiceError::KidError => {
                HttpResponse::InternalServerError().json("failed to decode kid")
            }
            ServiceError::NotPresentError => {
                HttpResponse::BadRequest().json("Specified key not found in set")
            }
            ServiceError::InvalidTokenError => HttpResponse::BadRequest().json("token invalid"),
        }
    }
}

pub async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, Error> {
    let config = req
        .app_data::<Config>().cloned().unwrap_or_default();

    let err = Err(AuthenticationError::from(config).into());
    match validate_token(credentials.token()).await {
        Ok(res) => match res {
            true => Ok(req),
            false => err,
        },
        Err(_) => err,
    }
}

async fn validate_token(token: &str) -> Result<bool, ServiceError> {
    let authority = std::env::var("AUTHORITY").expect("AUTHORITY must be set");
    let jwks_url = &format!("{}{}", authority, ".well-known/jwks.json");
    let jwks = match fetch_jwks(jwks_url).await {
        Ok(jwks) => jwks,
        Err(_) => return Err(ServiceError::JWKSFetchError),
    };

    let validations = vec![
        Validation::Issuer(authority),
        Validation::SubjectPresent,
        Validation::NotExpired,
    ];
    match token_kid(token) {
        Ok(kid) => {
            let kid = match kid {
                Some(kid) => kid,
                None => return Err(ServiceError::KidError),
            };

            let jwk = match jwks.find(&kid) {
                Some(jwk) => jwk,
                None => return Err(ServiceError::NotPresentError),
            };

            match validate(token, jwk, validations) {
                Ok(_) => Ok(true),
                Err(_) => Err(ServiceError::InvalidTokenError),
            }
        }
        Err(_) => Err(ServiceError::KidError),
    }
}

async fn fetch_jwks(uri: &str) -> Result<JWKS, reqwest::Error> {
    reqwest::get(uri).await?.json::<JWKS>().await
}
