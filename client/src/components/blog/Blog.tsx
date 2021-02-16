import React, { Component, Fragment } from "react";
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";

import { BlogServiceProps, BlogPostData } from "./BlogService";
import BlogPost from "./BlogPost";

import "../../shared/Section.scss";
import "./Blog.scss";

type BlogState = {
  blog: BlogPostData[];
};

type BlogRouteParams = { id: string };

class Blog extends Component<
  BlogServiceProps & RouteComponentProps,
  BlogState
> {
  setBlogState(blog: BlogPostData[]) {
    this.setState({ blog });
  }

  componentWillMount(): void {
    this.setBlogState([]);
    this.props.service
      .FetchAllBlogPosts()
      .then(this.setBlogState.bind(this))
      .catch((err) => console.log(err));
  }

  showPost({ match }: RouteComponentProps<BlogRouteParams>): JSX.Element {
    return (
      <BlogPost service={this.props.service} id={parseInt(match.params.id)} />
    );
  }

  blogPosts(): JSX.Element {
    return (
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
    );
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <Switch location={this.props.location}>
          <Route
            exact
            path={`${this.props.match.path}`}
            children={this.blogPosts.bind(this)}
          />
          <Route
            path={`${this.props.match.path}/:id`}
            children={this.showPost.bind(this)}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(Blog);
