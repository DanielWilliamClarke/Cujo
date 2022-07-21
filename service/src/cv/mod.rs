// src/cv/mod.rs

mod cv_reader;
mod model;

pub use cv_reader::CVReader;
pub use model::{
    About, AboutEntry, Education, EducationEntries, Project, ProjectEntries, Skills, SkillsEntry,
    Work, WorkEntries, CV,
};
