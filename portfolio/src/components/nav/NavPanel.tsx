import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavHashLink } from "react-router-hash-link";

import "./NavPanel.scss";

export class NavPanel extends Component {
  render(): JSX.Element {
    return (
      <Navbar
        sticky="top"
        bg="dark"
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
