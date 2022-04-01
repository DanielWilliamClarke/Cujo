import axios from "axios";
import { injectable } from "inversify";

import { BlogPostEntries } from "../model/BlogPost";
import { CV } from "../model/CVModel";

export interface ICujoService {
  FetchCV(): Promise<CV>
  FetchBlogPosts(): Promise<BlogPostEntries>
}

@injectable()
export class CujoService implements ICujoService {
  async FetchCV(): Promise<CV> {
    return (await axios.get('/api/cv')).data as CV;
  }

  async FetchBlogPosts(): Promise<BlogPostEntries> {
    return (await axios.get('/api/blog')).data as BlogPostEntries;
  }
}
