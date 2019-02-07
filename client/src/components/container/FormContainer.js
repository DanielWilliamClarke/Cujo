import React, { Component } from "react";
import Input from "../presentational/Input";
import ReactMarkdown from 'react-markdown';

export default class FormContainer extends Component {

  constructor() {
    super();

    this.state = {
      markdown: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    /* figured out how to style the markdown */
    /* https://github.com/rexxars/react-markdown */
    const strong = props => <strong className="asd">{props.children}</strong>;
    const heading = props => <h2 className="asd">{props.children}</h2>;

    const { markdown } = this.state;
    return (
      <form id="article-form">
        <ReactMarkdown source={markdown} renderers={{heading, strong}} />
        <Input
          text="Write your own markdown son!" 
          label="markdown"
          type="text"
          id="markdown"
          value={markdown}
          handleChange={this.handleChange}
        />
        <p>Compile Test - Boom</p>
      </form>
    );
  }
}

