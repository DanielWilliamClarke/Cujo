use contentful::ContentfulClient;

use crate::{
    blog::{BlogReader, BlogPost},
    cv::{CVReader, CV, CujoEntries},
    util::Reader,
};

#[derive(Debug, Clone)]
pub struct Cache {
    pub cv: CV,
    pub blog: CujoEntries<BlogPost>,
}

impl Cache {
    pub async fn generate_cache(client: ContentfulClient) -> Cache {
        Cache {
            cv: match CVReader::from(&client).get().await {
                Ok(cv) => cv,
                Err(err) => panic!("Could not generate cv cache - {}", err),
            },
            blog: match BlogReader::from(&client).get().await {
                Ok(blog) => blog,
                Err(err) => panic!("Could not generate blog cache - {}", err),
            },
        }
    }
}
