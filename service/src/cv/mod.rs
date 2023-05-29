// src/cv/mod.rs

mod cv_reader;
mod model;

pub use cv_reader::CVReader;
pub use model::{
    About, Education, Project, Skills,
    Work, CV, Book,
    CujoEntry, CujoEntries
};
