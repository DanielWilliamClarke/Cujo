import axios from "axios";
import { injectable } from "inversify";

import { ContentfulEntries } from "../model/ContentfulEntries";
import { CV } from "../model/CVModel";

export interface ICujoService {
  FetchCV(): Promise<CV>
  FetchBlogPosts(): Promise<ContentfulEntries>
}

@injectable()
export class CujoService implements ICujoService {
  async FetchCV(): Promise<CV> {
    return (await axios.get('/api/cv')).data as CV;
  }

  async FetchBlogPosts(): Promise<ContentfulEntries> {
    return (await axios.get('/api/blog')).data as ContentfulEntries;
  }
}
