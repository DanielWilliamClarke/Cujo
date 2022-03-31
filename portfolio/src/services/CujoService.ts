import axios from "axios";
import { injectable } from "inversify";

import { Post } from "../model/BlogPost";
import { CV } from "../model/CVModel";

export interface ICujoService {
  FetchCV(): Promise<CV>
  FetchBlogPosts(): Promise<Post[]>
}

@injectable()
export class CujoService implements ICujoService {
  async FetchCV(): Promise<CV> {
    return (await axios.get('/api/cv')).data as CV;
  }

  async FetchBlogPosts(): Promise<Post[]> {
    return (await axios.get('/api/blog')).data as Post[];
  }
}
