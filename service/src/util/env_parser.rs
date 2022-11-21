// src/utils/env_parser.rs

use serde::de::DeserializeOwned;
use std::{fmt::Debug, any::type_name};

pub trait FromEnv {
    fn from_env() -> Self
    where
        Self: DeserializeOwned + Debug,
    {
        let self_name = type_name::<Self>();
        match envy::prefixed("").from_env::<Self>() {
            Ok(config) => {
                println!("{} config parsed from env!", self_name);
                config
            }
            Err(err) => panic!("{} config not parsed! {:#?}", self_name, err),
        }
    }
}
