// src/blog/client.rs

use crate::blog::media::Media;
use crate::blog::post::Post;
use crate::blog::tag::Tag;

use reqwest;
use reqwest::Error;

use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};

use futures::try_join;

#[derive(Serialize, Deserialize)]
pub struct BlogData {
    pub post: Post,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub media: Option<Media>,
    pub tags: Vec<Tag>,
}

pub struct BlogClient {
    host: String,
}

impl BlogClient {
    pub fn new(host: String) -> BlogClient {
        BlogClient { host }
    }

    pub async fn get_posts(&self) -> Result<Vec<BlogData>, Error> {
        let posts = self.get::<Vec<Post>>("posts", None);
        let media = self.get::<Vec<Media>>("media", None);
        let tags = self.get::<Vec<Tag>>("tags", None);
        let (posts, media, tags) = try_join!(posts, media, tags)?;

        let correlated = posts
            .iter()
            .map(|p| self.correlate(p, &media, &tags))
            .collect();

        Ok(correlated)
    }

    pub async fn get_post(&self, id: &str) -> Result<BlogData, Error> {
        let post = self.get::<Post>("posts", Some(id));
        let media = self.get::<Vec<Media>>("media", None);
        let tags = self.get::<Vec<Tag>>("tags", None);

        let (post, media, tags) = try_join!(post, media, tags)?;
        Ok(self.correlate(&post, &media, &tags))
    }

    fn correlate(&self, post: &Post, media: &[Media], tags: &[Tag]) -> BlogData {
        BlogData {
            post: post.clone(),
            media: media.iter().cloned().find(|m| m.post == post.id),
            tags: tags
                .iter()
                .cloned()
                .filter(|t| post.tags.contains(&t.id))
                .collect(),
        }
    }

    async fn get<T>(&self, endpoint: &str, id: Option<&str>) -> Result<T, Error>
    where
        T: DeserializeOwned,
    {
        let url = match id {
            Some(id) => format!("{}/{}/{}", self.host, endpoint, id),
            None => format!("{}/{}", self.host, endpoint),
        };

        let response = reqwest::get(url).await?;
        Ok(response.json().await?)
    }
}

#[cfg(test)]
mod tests {
    use super::{BlogClient, BlogData};
    use crate::blog::media::Media;
    use crate::blog::post::Post;
    use crate::blog::tag::Tag;

    use mockito::mock;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize)]
    #[serde(rename_all = "camelCase")]
    pub struct TestJson {
        pub endpoint: String,
        pub id: String,
    }

    fn setup_http_mocks<T> (path: &str, data: &T) -> mockito::Mock
    where
        T: Serialize 
    {
        let json = serde_json::to_string(data).unwrap();

        mock("GET", path)
            .with_status(200)
            .with_header("content-type", "application/json")
            .with_body(json)
            .create()
    }

    fn setup_rest_mocks<P, M, T> (posts_url: &str, posts: &P, media: &M, tags: &T) -> (mockito::Mock, mockito::Mock, mockito::Mock) 
    where
        P: Serialize, 
        M: Serialize, 
        T: Serialize, 
    {
        let m_posts = setup_http_mocks(posts_url, posts);
        let m_media = setup_http_mocks("/media", media);
        let m_tags = setup_http_mocks("/tags", tags);

        (m_posts, m_media, m_tags)
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
            post: id,
            ..Default::default()
        }];
        let tags: Vec<Tag> = vec![Tag {
            id: tag_id,
            ..Default::default()
        }];

        let host = "test".to_string();
        let client = BlogClient::new(host);
        let blog_data: BlogData = client.correlate(&post, &media, &tags);

        assert_eq!(post, blog_data.post);
        assert_eq!(media[0], blog_data.media.unwrap());
        assert_eq!(tags, blog_data.tags);
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

        let host = "test".to_string();
        let client = BlogClient::new(host);
        let blog_data: BlogData = client.correlate(&post, &media, &tags);

        assert_eq!(post, blog_data.post);
        assert_eq!(blog_data.media, None);
        assert_eq!(0, blog_data.tags.len());
    }

    #[actix_rt::test]
    async fn can_mock_get() {
    
        let test_data = TestJson {
            endpoint: "posts".to_string(),
            id: "test_id".to_string(),
        };

        let url = format!("/{}/{}", test_data.endpoint, test_data.id);
        let m = setup_http_mocks::<TestJson>(&url, &test_data);

        let host = mockito::server_url().to_string();
        let client = BlogClient::new(host.clone());
        match client
            .get::<TestJson>(&test_data.endpoint, Some(&test_data.id))
            .await
        {
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
            post: id,
            ..Default::default()
        }];
        let tags: Vec<Tag> = vec![Tag {
            id: tag_id,
            ..Default::default()
        }];

        let (m_posts, m_media, m_tags) =
            setup_rest_mocks::<Vec<Post>, Vec<Media>, Vec<Tag>>("/posts", &posts, &media, &tags);

        let host = mockito::server_url().to_string();
        let client = BlogClient::new(host);
        match client.get_posts().await {
            Ok(blog_data) => {
                blog_data.iter().for_each(|b| {
                    assert_eq!(posts[0], b.post);
                    assert_eq!(media[0], b.media.clone().unwrap());
                    assert_eq!(tags, b.tags);
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
            post: id,
            ..Default::default()
        }];
        let tags: Vec<Tag> = vec![Tag {
            id: tag_id,
            ..Default::default()
        }];

        let post_url = format!("/posts/{}", id);
        let (m_posts, m_media, m_tags) =
            setup_rest_mocks::<Post, Vec<Media>, Vec<Tag>>(&post_url, &post, &media, &tags);   

        let host = mockito::server_url().to_string();
        let client = BlogClient::new(host);
        match client.get_post(&id.to_string()).await {
            Ok(blog_data) => {
                assert_eq!(post, blog_data.post);
                assert_eq!(media[0], blog_data.media.clone().unwrap());
                assert_eq!(tags, blog_data.tags);
            }
            Err(err) => panic!("Did not expect error: {}", err),
        };

        m_posts.assert();
        m_media.assert();
        m_tags.assert();
    }
}
