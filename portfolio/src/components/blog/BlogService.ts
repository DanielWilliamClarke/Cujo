import axios, { AxiosResponse } from "axios";

import { Post } from "../../model/BlogPostModel";

export type BlogServiceProps = {
  service: BlogService;
};

export class BlogService {
  public async FetchAllBlogPosts(): Promise<Post[]> {
    const response: AxiosResponse = await axios.get('/api/blog');
    return response.data as Post[];
  }

  public async FetchBlogPost(postID: number): Promise<Post> {
    const response: AxiosResponse = await axios.get(`/api/blog/${postID}`);
    return response.data as Post;
  }
}
