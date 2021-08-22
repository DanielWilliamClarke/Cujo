import axios from "axios";

import { Post } from "../../model/BlogPostModel";

export type BlogServiceProps = {
  service: BlogService;
};

export class BlogService {
  constructor(private postsData: Post[] = []) {}

  public async fetch(): Promise<BlogService> {
    this.postsData = (await axios.get('/api/blog')).data as Post[];
    return this;
  }

  posts(): Post[] {
    return this.postsData;
  }

  post(id: number): Post | undefined {
    return this.postsData.find((p: Post) => p.id === id);
  }
}
