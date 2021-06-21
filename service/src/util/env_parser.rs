// src/utils/env_parser.rs

use serde::de::DeserializeOwned;

pub trait FromEnv {
    fn parse() -> Self
    where
        Self: DeserializeOwned,
    {
        match envy::from_env::<Self>() {
            Ok(config) => {
                println!("Cujo-rust API config set!");
                config
            }
            Err(err) => panic!("Cujo-rust config not set! {:#?}", err),
        }
    }
}