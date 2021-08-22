import axios from "axios";
import { injectable } from "inversify";

import { Post } from "../model/BlogPostModel";

export interface IBlogService {
  FetchAllBlogPosts(): Promise<Post[]>
  FetchBlogPost(postID: number): Promise<Post>
}

@injectable()
export class BlogService {
  async FetchAllBlogPosts(): Promise<Post[]> {
    return (await axios.get('/api/blog')).data as Post[];
  }

  async FetchBlogPost(postID: number): Promise<Post> {
    return (await axios.get(`/api/blog/${postID}`)).data as Post;
  }
}
