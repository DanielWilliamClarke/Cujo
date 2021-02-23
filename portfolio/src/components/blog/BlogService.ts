import WPAPI from "wpapi";

import { Post } from "../../model/BlogPostModel";
import { Media } from "../../model/BlogMediaModel";
import { Tag } from "../../model/BlogTagModel";

export interface BlogPostData {
    post: Post;
    media: Media;
    tags: Tag[];
}
  
export type BlogServiceProps = {
  service: BlogService;
};

export class BlogService {
  constructor(private wp: WPAPI) {}

  public async FetchAllBlogPosts(): Promise<BlogPostData[]> {
    const [posts, media, tags]: [Post[], Media[], Tag[]] = await Promise.all([
      this.wp.posts(),
      this.wp.media(),
      this.wp.tags(),
    ]);

    return posts.map(
      (post: Post): BlogPostData => this.correlate([post, media, tags])
    );
  }

  public async FetchBlogPost(postID: number): Promise<BlogPostData> {
    return this.correlate(
      await Promise.all([
        this.wp.posts().id(postID),
        this.wp.media(),
        this.wp.tags(),
      ])
    );
  }

  private correlate([post, media, tags]: [Post, Media[], Tag[]]): BlogPostData {
    return {
      post,
      media: media.find((m: Media): boolean => m.post === post.id),
      tags: tags.filter((t: Tag): boolean => post.tags.includes(t.id)),
    } as BlogPostData;
  }
}
