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
    use std::io::{Error, ErrorKind};

    #[derive(Serialize, Deserialize)]
    #[serde(rename_all = "camelCase")]
    struct TestJson {
        attr: String,
    }

    #[test]
    fn can_mock_read_return_error() {
        let input = "test";

        read.mock_safe(|filepath| {
            let error = Error::new(
                ErrorKind::NotFound,
                format!("expected failure for: {}", filepath),
            );
            MockResult::Return(Err(error))
        });

        match read(input) {
            Ok(_) => panic!("not expecting data"),
            Err(err) => {
                assert_eq!(ErrorKind::NotFound, err.kind());
            }
        }
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

    #[test] 
    fn can_return_error_on_parse_read () {
        let input = "test";

        read.mock_safe(|filepath| {
            let error = Error::new(
                ErrorKind::NotFound,
                format!("expected failure for: {}", filepath),
            );
            MockResult::Return(Err(error))
        });
        
        match parse::<TestJson>(input) {
            Ok(_) => panic!("not expecting valid json"),
            Err(err) => {
                assert_eq!(ErrorKind::NotFound, err.kind());
            }
        };
    }

    #[test]
    fn can_return_error_on_parse_faulure () {

        #[derive(Serialize, Deserialize)]
        #[serde(rename_all = "camelCase")]
        struct ErroneousData {
            __not_real: String
        }

        let input = "test";

        read.mock_safe(|filepath| {
            let test_data = TestJson {
                attr: filepath.to_string(),
            };
            let json = serde_json::to_string(&test_data).unwrap();
            MockResult::Return(Ok(json))
        });

        match parse::<ErroneousData>(input) {
            Ok(_) => panic!("not expecting valid json"),
            Err(err) => {
                assert_eq!(ErrorKind::InvalidData, err.kind());
            }
        };
    }
}
