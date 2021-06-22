// src/blog/client.rs

use crate::blog::model::BlogPost;
use crate::blog::model::Media;
use crate::blog::model::Post;
use crate::blog::model::Tag;
use crate::util::FromEnv;

extern crate base64;

use base64::encode;
use reqwest;
use reqwest::header::AUTHORIZATION;
use reqwest::Error;

use futures::try_join;
use serde::de::DeserializeOwned;
use serde::Deserialize;

#[derive(Deserialize, Debug, Clone)]
pub struct BlogConfig {
    host: String,
    client_id: String,
    client_secret: String,
}
impl FromEnv for BlogConfig {}

pub struct BlogClient<'a> {
    config: &'a BlogConfig,
}

impl<'a> BlogClient<'a> {
    pub fn new(config: &'a BlogConfig) -> BlogClient<'a> {
        BlogClient { config }
    }

    pub async fn get_posts(&self) -> Result<Vec<BlogPost>, Error> {
        let (posts, media, tags) = try_join!(
            self.get::<Vec<Post>>("posts"),
            self.get::<Vec<Media>>("media"),
            self.get::<Vec<Tag>>("tags")
        )?;

        let correlated = posts
            .iter()
            .map(|p| self.correlate(p, &media, &tags))
            .collect();

        Ok(correlated)
    }

    pub async fn get_post(&self, id: &str) -> Result<BlogPost, Error> {
        let endpoint = format!("posts/{}", id);

        let (post, media, tags) = try_join!(
            self.get::<Post>(&endpoint),
            self.get::<Vec<Media>>("media"),
            self.get::<Vec<Tag>>("tags")
        )?;

        Ok(self.correlate(&post, &media, &tags))
    }

    async fn get<T>(&self, endpoint: &str) -> Result<T, Error>
    where
        T: DeserializeOwned,
    {
        let basic_auth = encode(format!(
            "{}:{}",
            self.config.client_id, self.config.client_secret
        ));

        let client = reqwest::Client::new();
        let response = client
            .get(format!("{}/{}", self.config.host, endpoint))
            .header(AUTHORIZATION, format!("Basic {}", basic_auth))
            .send()
            .await?;

        Ok(response.json().await?)
    }

    fn correlate(&self, post: &Post, media: &[Media], tags: &[Tag]) -> BlogPost {
        let media_url = match media.iter().find(|m| match m.post {
            Some(id) => id == post.id,
            None => false,
        }) {
            Some(m) => Some(m.source_url.clone()),
            None => None,
        };

        let tags = tags
            .iter()
            .filter(|t| post.tags.contains(&t.id))
            .map(|t| t.name.clone())
            .collect();

        BlogPost {
            id: post.id,
            title: post.title.rendered.clone(),
            content: post.content.rendered.clone(),
            excerpt: post.excerpt.rendered.clone(),
            date: post.date.clone(),
            modified: post.modified.clone(),
            media_url,
            tags,
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::blog::model::BlogPost;
    use crate::blog::model::Media;
    use crate::blog::model::Post;
    use crate::blog::model::Tag;
    use super::{BlogClient, BlogConfig};

    use mockito::mock;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct TestJson {
        pub endpoint: String,
        pub id: String,
    }

    fn setup_http_mocks<T>(path: &str, data: &T) -> mockito::Mock
    where
        T: Serialize,
    {
        let json = serde_json::to_string(data).unwrap();

        mock("GET", path)
            .with_status(200)
            .with_header("content-type", "application/json")
            .with_body(json)
            .create()
    }

    fn setup_rest_mocks<P, M, T>(
        posts_url: &str,
        posts: &P,
        media: &M,
        tags: &T,
    ) -> (mockito::Mock, mockito::Mock, mockito::Mock)
    where
        P: Serialize,
        M: Serialize,
        T: Serialize,
    {
        (
            setup_http_mocks(posts_url, posts),
            setup_http_mocks("/media", media),
            setup_http_mocks("/tags", tags),
        )
    }

    #[test]
    fn can_correlate() {
        let id: i64 = 12345;
        let tag_id: i64 = 54321;

        let post = Post {
            id,
            tags: vec![tag_id],
            ..Default::default()
        };
        let media: Vec<Media> = vec![Media {
            post: Some(id),
            source_url: String::from("https://somewhere.com/img.jpg"),
            ..Default::default()
        }];

        let test_tags = vec![String::from("test")];
        let tags = test_tags
            .iter()
            .map(|name| Tag {
                id: tag_id,
                name: String::from(name),
                ..Default::default()
            })
            .collect::<Vec<Tag>>();

        let config = BlogConfig {
            host: String::from("test"),
            client_id: String::from("id"),
            client_secret: String::from("secret"),
        };
        let client = BlogClient::new(&config);

        let bp: BlogPost = client.correlate(&post, &media, &tags);

        assert_eq!(post.id, bp.id);
        assert_eq!(media[0].source_url, bp.media_url.unwrap());
        assert_eq!(test_tags, bp.tags);
    }

    #[test]
    fn can_correlate_with_no_media_or_tags() {
        let id: i64 = 12345;
        let post = Post {
            id,
            ..Default::default()
        };
        let media: Vec<Media> = vec![];
        let tags: Vec<Tag> = vec![];

        let config = BlogConfig {
            host: String::from("test"),
            client_id: String::from("id"),
            client_secret: String::from("secret"),
        };
        let client = BlogClient::new(&config);

        let bp: BlogPost = client.correlate(&post, &media, &tags);

        assert_eq!(post.id, bp.id);
        assert_eq!(None, bp.media_url);
        assert_eq!(0, bp.tags.len());
    }

    #[actix_rt::test]
    async fn can_mock_get() {
        let test_data = TestJson {
            endpoint: "posts".to_string(),
            id: "test_id".to_string(),
        };

        let url = format!("/{}", test_data.endpoint);
        let m = setup_http_mocks::<TestJson>(&url, &test_data);

        let config = BlogConfig {
            host: mockito::server_url(),
            client_id: String::from("id"),
            client_secret: String::from("secret"),
        };
        let client = BlogClient::new(&config);

        match client.get::<TestJson>(&test_data.endpoint).await {
            Ok(data) => {
                assert_eq!(test_data.endpoint, data.endpoint);
                assert_eq!(test_data.id, data.id);
            }
            Err(err) => panic!("Error: {}", err),
        };

        m.assert();
    }

    #[actix_rt::test]
    async fn can_get_posts() {
        let id: i64 = 12345;
        let tag_id: i64 = 54321;

        let posts: Vec<Post> = vec![Post {
            id,
            tags: vec![tag_id],
            ..Default::default()
        }];
        let media: Vec<Media> = vec![Media {
            post: Some(id),
            ..Default::default()
        }];
        let test_tags = vec![String::from("test")];
        let tags = test_tags
            .iter()
            .map(|name| Tag {
                id: tag_id,
                name: String::from(name),
                ..Default::default()
            })
            .collect::<Vec<Tag>>();

        let (m_posts, m_media, m_tags) =
            setup_rest_mocks::<Vec<Post>, Vec<Media>, Vec<Tag>>("/posts", &posts, &media, &tags);

        let config = BlogConfig {
            host: mockito::server_url(),
            client_id: String::from("id"),
            client_secret: String::from("secret"),
        };
        let client = BlogClient::new(&config);

        match client.get_posts().await {
            Ok(bp) => {
                bp.iter().for_each(|b| {
                    assert_eq!(posts[0].id, b.id);
                    assert_eq!(media[0].source_url, b.media_url.clone().unwrap());
                    assert_eq!(test_tags, b.tags);
                });
            }
            Err(err) => panic!("Did not expect error: {}", err),
        };

        m_posts.assert();
        m_media.assert();
        m_tags.assert();
    }

    #[actix_rt::test]
    async fn can_get_post_by_id() {
        let id: i64 = 12345;
        let tag_id: i64 = 54321;

        let post = Post {
            id,
            tags: vec![tag_id],
            ..Default::default()
        };
        let media: Vec<Media> = vec![Media {
            post: Some(id),
            ..Default::default()
        }];
        let test_tags = vec![String::from("test")];
        let tags = test_tags
            .iter()
            .map(|name| Tag {
                id: tag_id,
                name: String::from(name),
                ..Default::default()
            })
            .collect::<Vec<Tag>>();

        let post_url = format!("/posts/{}", id);
        let (m_posts, m_media, m_tags) =
            setup_rest_mocks::<Post, Vec<Media>, Vec<Tag>>(&post_url, &post, &media, &tags);

        let config = BlogConfig {
            host: mockito::server_url(),
            client_id: String::from("id"),
            client_secret: String::from("secret"),
        };
        let client = BlogClient::new(&config);

        match client.get_post(&id.to_string()).await {
            Ok(bp) => {
                assert_eq!(post.id, bp.id);
                assert_eq!(media[0].source_url, bp.media_url.clone().unwrap());
                assert_eq!(test_tags, bp.tags);
            }
            Err(err) => panic!("Did not expect error: {}", err),
        };

        m_posts.assert();
        m_media.assert();
        m_tags.assert();
    }
}
