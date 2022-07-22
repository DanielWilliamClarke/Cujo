import { injectable } from "inversify";
import { createClient } from '@urql/core';

import { Post } from "../model/BlogPost";
import { Entries } from "../model/Includes";
import { CV } from "../model/CVModel";

import CujoQuery from './Cujo.gql';


export type GraphQLResponse = { cv: CV, blog: Entries<Post> }

export interface ICujoService {
  FetchGraphQL(): Promise<GraphQLResponse>
}

@injectable()
export class CujoService implements ICujoService {
  async FetchGraphQL(): Promise<GraphQLResponse> {
    const client = createClient({
      url: '/api/graphql',
    });

    const { data } = await
      client.query<GraphQLResponse>(CujoQuery)
        .toPromise()

    return data!;
  }
}
