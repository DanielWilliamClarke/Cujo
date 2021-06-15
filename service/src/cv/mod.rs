// src/cv/mod.rs

mod model;
mod routes;

pub use model::{CV, Basics, Location};
pub use routes::init_routes;