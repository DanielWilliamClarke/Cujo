import axios, { AxiosResponse } from "axios";

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
  public async FetchAllBlogPosts(): Promise<BlogPostData[]> {
    const response: AxiosResponse = await axios.get('/api/blog');
    return response.data as BlogPostData[];
  }

  public async FetchBlogPost(postID: number): Promise<BlogPostData> {
    const response: AxiosResponse = await axios.get(`/api/blog/${postID}`);
    return response.data as BlogPostData;
  }
}
