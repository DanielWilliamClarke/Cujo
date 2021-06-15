// src/util/file_reader.rs
#![cfg_attr(test, feature(proc_macro_hygiene))]

use std::io::Result;
use serde::de::DeserializeOwned;
use std::fs;

use mocktopus::macros::*;

#[mockable]
fn read_file(filepath: &str) -> Result<String> {
    fs::read_to_string(filepath)
}

pub fn parse<'a, T>(filepath: &str) -> Result<T>
where 
    T: DeserializeOwned
{
    let data = read_file(filepath)?;
    let output: T = serde_json::from_str(data.as_str())?;

    Ok(output)
}

#[cfg(test)]
mod tests {
    use mocktopus::mocking::*;
    use super::read_file;
    #[test]
    fn can_read() {
        read_file.mock_safe(|filepath| MockResult::Return(Ok("test".to_string())));

        assert_eq!(
            "test".to_string(),
             read_file("test").unwrap());
    }
}