import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import ReactMarkdown from 'react-markdown';

export default class FormContainer extends Component {

  constructor() {
    super();

    this.state = {
      seo_title: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { seo_title } = this.state;

    const markdown = '## Reasons React is great   \n' + 
    '**I am the next line**\n' +
    '---\n' + 
    '- I am a list **item**\n' + 
    '- I am another list **item**\n' +
    '![alt text](https://media.licdn.com/dms/image/C5603AQH1jMzGibRNHw/profile-displayphoto-shrink_200_200/0?e=1534982400&v=beta&t=JMyBNrBDUhwNHkLGA9VQE61zNbpE--yljnwalK3Dkp4 "King of SW")'
    

    return (
      <form id="article-form">

        <ReactMarkdown source={markdown} />

        <Input
          text="My Title yo"
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
        <p>Compile Test - Boom</p>
      </form>
    );
  }
}

const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;
