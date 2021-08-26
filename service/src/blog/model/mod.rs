// src/blog/model/mod.rs

mod blog_post;
mod wp_post;
mod wp_media;
mod wp_tag;

pub use blog_post::BlogPost;
pub use wp_post::Post;
pub use wp_media::Media;
pub use wp_tag::Tag;
