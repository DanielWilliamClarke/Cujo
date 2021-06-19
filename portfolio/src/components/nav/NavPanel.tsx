import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavHashLink } from "react-router-hash-link";

import "./NavPanel.scss";

export class NavPanel extends Component {
  state = {
    bg: undefined,
  };

  listenScrollEvent = () => {
    if (window.scrollY < window.innerHeight) {
      this.setState({ bg: undefined });
    } else {
      this.setState({ bg: "dark" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
  }

  render(): JSX.Element {
    return (
      <Navbar
        bg={this.state.bg}
        sticky="top"
        variant="dark"
        className="justify-content-center"
      >
        <Nav
          justify
          variant="pills"
          navbarScroll
          style={{ textTransform: "capitalize" }}
        >
          {[
            "about",
            "experience",
            "education",
            "projects",
            "skills",
            "contact",
          ].map((hash: string): JSX.Element => this.createLink("/", hash))}
          {this.createLink("/blog", "blog")}
        </Nav>
      </Navbar>
    );
  }

  private createLink(link: string, hash: string): JSX.Element {
    return <Nav.Link href={`${link}#${hash}`}>{hash}</Nav.Link>;
  }
}
