
use std::fmt::Display;

#[derive(Debug)]
pub enum ContentfulClientErrors {
    RequestError(reqwest::Error),
    ResponseMalformed(reqwest::Error),
    Deserialization(serde_json::Error),
    NoEntries,
}

impl std::error::Error for ContentfulClientErrors {}

impl Display for ContentfulClientErrors {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ContentfulClientErrors::RequestError(err) => write!(f, "Contentful client error - client api request error: {}", err),
            ContentfulClientErrors::ResponseMalformed(err) => write!(f, "Contentful client error - api response malformed: {}", err),
            ContentfulClientErrors::Deserialization(err) => write!(f, "Contentful client error - cannot deserialize item: {}", err),
            ContentfulClientErrors::NoEntries => write!(f, "Contentful client error - no entries found"),
        }
    } 
}