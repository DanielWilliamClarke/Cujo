import axios from "axios";
import { injectable } from "inversify";
import { GraphQLClient } from 'graphql-request'

import { Post } from "../model/BlogPost";
import { Entries } from "../model/Includes";
import { CV } from "../model/CVModel";

import CujoQuery from './Cujo.gql';

export type GraphQLResponse = {cv: CV, blog: Entries<Post>}

export interface ICujoService {
  FetchCV(): Promise<CV>
  FetchBlogPosts(): Promise<Entries<Post>>
  FetchGraphQL(): Promise<GraphQLResponse> 
}

@injectable()
export class CujoService implements ICujoService {
  async FetchCV(): Promise<CV> {
    return (await axios.get('/api/cv')).data as CV;
  }

  async FetchBlogPosts(): Promise<Entries<Post>> {
    return (await axios.get('/api/blog')).data as Entries<Post>;
  }

  async FetchGraphQL(): Promise<GraphQLResponse> {
    return await new GraphQLClient('/api/graphql').request<GraphQLResponse>(CujoQuery);
  }
}
