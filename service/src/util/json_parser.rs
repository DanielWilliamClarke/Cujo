// src/util/file_reader.rs

use serde::de::DeserializeOwned;
use std::io::Result;

use std::fs;

use mocktopus::macros::*;

#[mockable]
fn read(filepath: &str) -> Result<String> {
    fs::read_to_string(filepath)
}

pub fn parse<T>(filepath: &str) -> Result<T>
where
    T: DeserializeOwned,
{
    Ok(serde_json::from_str(read(filepath)?.as_str())?)
}

#[cfg(test)]
mod tests {
    use super::{parse, read};
    use mocktopus::mocking::*;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct TestJson {
        attr: String,
    }

    #[test]
    fn can_mock_read() {
        let input = "test";

        read.mock_safe(|filepath| MockResult::Return(Ok(filepath.to_string())));

        assert_eq!(input.to_string(), read(input).unwrap());
    }

    #[test]
    fn can_parse_json_to_struct() {
        let input = "test";

        read.mock_safe(|filepath| {
            let test_data = TestJson {
                attr: filepath.to_string(),
            };
            let json = serde_json::to_string(&test_data).unwrap();
            MockResult::Return(Ok(json))
        });

        match parse::<TestJson>(input) {
            Ok(value) => assert_eq!(value.attr, input),
            Err(_) => panic!("output does not contain {}", input),
        };
    }
}
