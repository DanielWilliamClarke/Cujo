import axios from "axios";
import { injectable } from "inversify";

import { Post } from "../model/BlogPostModel";
import { CV } from "../model/CVModel";

export interface ICujoService {
  FetchCV(): Promise<CV>
  FetchAllBlogPosts(): Promise<Post[]>
  FetchBlogPost(postID: number): Promise<Post>
}

@injectable()
export class CujoService {
  async FetchCV(): Promise<CV> {
    return (await axios.get('/api/cv')).data as CV;
  }

  async FetchAllBlogPosts(): Promise<Post[]> {
    return (await axios.get('/api/blog')).data as Post[];
  }

  async FetchBlogPost(postID: number): Promise<Post> {
    return (await axios.get(`/api/blog/${postID}`)).data as Post;
  }
}
