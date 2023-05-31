// src/util/reader.rs

use async_trait::async_trait;

#[async_trait]
pub trait Reader {
    type Data;
    type Error = Box<dyn std::error::Error>;

    async fn get(&self) -> Result<Self::Data, Self::Error>;
}
