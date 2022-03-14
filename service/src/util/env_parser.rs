// src/utils/env_parser.rs

use serde::de::DeserializeOwned;
use std::fmt::Debug;

pub trait FromEnv {
    fn from_env() -> Self
    where
        Self: DeserializeOwned + Debug,
    {
        match envy::prefixed("").from_env::<Self>() {
            Ok(config) => {
                print!("Cujo-rust config parsed!");
                config
            }
            Err(err) => panic!("Cujo-rust config not parsed! {:#?}", err),
        }
    }
}
