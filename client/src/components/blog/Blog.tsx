import React, { Component, Fragment } from "react";
import WPAPI from "wpapi";

import { BlogPost, BlogPostData } from "./BlogPost"
import { Post } from "./BlogPostModel";
import { Media } from "./BlogMediaModel";
import { Tag } from "./BlogTagModel";

import "../../shared/Section.scss";
import "./Blog.scss";

type BlogState = {
  blog: BlogPostData[];
};

export class Blog extends Component<{}, BlogState> {
  private wp: WPAPI;

  constructor(props: {}) {
    super(props);
    this.wp = new WPAPI({
      endpoint: "http://localhost:8000/wp-json",
    });
  }

  correlate([posts, media, tags]: [Post[], Media[], Tag[]]): void {
    const blog: BlogPostData[] = posts.map(
      (p: Post): BlogPostData => {
        return {
          post: p,
          media: media.find((m: Media): boolean => m.post === p.id),
          tags: tags.filter((t: Tag): boolean => p.tags.includes(t.id)),
        } as BlogPostData;
      }
    );

    this.setState({ blog });
  }

  componentWillMount(): void {
    this.setState({ blog: [] });
    Promise.all([this.wp.posts(), this.wp.media(), this.wp.tags()])
      .then(this.correlate.bind(this))
      .catch((err) => console.log(err));
  }

  render(): JSX.Element {
    return (
      <Fragment>
        {this.state.blog.map(
          (post: BlogPostData): JSX.Element => (
            <BlogPost p={post} />
          )
        )}
      </Fragment>
    );
  }
}
