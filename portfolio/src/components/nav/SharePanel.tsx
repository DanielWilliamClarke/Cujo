import React, { Component } from "react";
import { Container } from "react-bootstrap";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";

import "./SharePanel.scss";

const Slide = require("react-reveal/Slide");

interface ShareProps {
  url: string;
  title?: string;
  body: string;
  hashtag: string;
}

export class SharePanel extends Component<ShareProps> {
  private size: number = 40;

  render(): JSX.Element {
    return (
      <Container className="share-panel">
        <Slide left>
          <LinkedinShareButton
            url={this.props.url}
            title={this.prepareTitle(this.props.title)}
            summary={this.sanitize(this.props.body)}
          >
            <LinkedinIcon size={this.size} />
          </LinkedinShareButton>

          <FacebookShareButton
            url={this.props.url}
            quote={this.prepareTitle(this.props.title)}
            hashtag={this.props.hashtag}
          >
            <FacebookIcon size={this.size} />
          </FacebookShareButton>

          <RedditShareButton
            url={this.props.url}
            title={this.prepareTitle(this.props.title)}
          >
            <RedditIcon size={this.size} />
          </RedditShareButton>

          <TwitterShareButton
            url={this.props.url}
            title={this.prepareTitle(this.props.title)}
            hashtags={[this.props.hashtag]}
          >
            <TwitterIcon size={this.size} />
          </TwitterShareButton>

          <WhatsappShareButton
            url={this.props.url}
            title={this.prepareTitle(this.props.title)}
            separator=" - "
          >
            <WhatsappIcon size={this.size} />
          </WhatsappShareButton>

          <EmailShareButton
            url={this.props.url}
            subject={this.prepareTitle(this.props.title)}
            body={this.sanitize(this.props.body)}
            separator=" - "
          >
            <EmailIcon size={this.size} />
          </EmailShareButton>
        </Slide>
      </Container>
    );
  }

  private sanitize(input: string): string {
    return input.replace(/(<([^>]+)>)/gi, "");
  }

  private prepareTitle(title: string | undefined): string {
    const prefix = "DanielClarke.tech";
    return title ? `${prefix} - ${title}` : prefix;
  }
}
