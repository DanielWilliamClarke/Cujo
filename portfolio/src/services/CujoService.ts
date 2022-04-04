import axios from "axios";
import { injectable } from "inversify";

import { Post } from "../model/BlogPost";
import { Entries } from "../model/Includes";
import { CV } from "../model/CVModel";

export interface ICujoService {
  FetchCV(): Promise<CV>
  FetchBlogPosts(): Promise<Entries<Post>>
}

@injectable()
export class CujoService implements ICujoService {
  async FetchCV(): Promise<CV> {
    return (await axios.get('/api/cv')).data as CV;
  }

  async FetchBlogPosts(): Promise<Entries<Post>> {
    return (await axios.get('/api/blog')).data as Entries<Post>;
  }
}
