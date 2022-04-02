// src/cv/mod.rs

mod cv_reader;
mod model;

pub use cv_reader::{About, CVReader};
pub use model::{CVConfig, CV};
