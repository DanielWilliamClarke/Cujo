import React, { Component, Fragment } from "react";
import { Link, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import WPAPI from "wpapi";

import { BlogPost, BlogPostData } from "./BlogPost";
import { Post } from "./BlogPostModel";
import { Media } from "./BlogMediaModel";
import { Tag } from "./BlogTagModel";

import "../../shared/Section.scss";
import "./Blog.scss";

type BlogState = {
  blog: BlogPostData[];
};

type BlogRouteParams = { id: string };

class Blog extends Component<RouteComponentProps, BlogState> {
  private wp: WPAPI;

  constructor(props: RouteComponentProps) {
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

  showPost({ match }: RouteComponentProps<BlogRouteParams>): JSX.Element {
    return (
      <BlogPost
        p={
          this.state.blog.find(
            (data) => data.post.id === parseInt(match.params.id)
          ) as BlogPostData
        }
      />
    );
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <ul>
          {this.state.blog.map(
            (data: BlogPostData): JSX.Element => (
              <li key={data.post.id}>
                <Link to={`${this.props.match.url}/${data.post.id}`}>
                  {data.post.title.rendered}
                </Link>
              </li>
            )
          )}
        </ul>
        <Switch>
          <Route path={`${this.props.match.path}/:id`} component={this.showPost.bind(this)} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(Blog);