import { injectable } from "inversify";
import { GraphQLClient } from 'graphql-request'

import { Post } from "../model/BlogPost";
import { Entries } from "../model/Includes";
import { CV } from "../model/CVModel";

import CujoQuery from './Cujo.gql';

export type GraphQLResponse = {cv: CV, blog: Entries<Post>}

export interface ICujoService {
  FetchGraphQL(): Promise<GraphQLResponse> 
}

@injectable()
export class CujoService implements ICujoService {
  async FetchGraphQL(): Promise<GraphQLResponse> {
    return await new GraphQLClient('/api/graphql').request<GraphQLResponse>(CujoQuery);
  }
}
