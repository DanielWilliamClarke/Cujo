import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavHashLink } from "react-router-hash-link";

import "./NavPanel.scss";
import logo from "../../assets/logo_blue.png";

interface StyleProps {
  style: React.CSSProperties;
}

export class NavPanel extends Component<StyleProps> {
  render(): JSX.Element {
    return (
      <nav style={this.props.style} className="nav-panel">
        <div className="nav-container nav-logo">
          <img src={logo} alt="logo" />
        </div>
        <Container>
          <Row className="nav-container">
            {["about", "experience", "education", "projects", "technical", "contact"].map(
              (hash: string): JSX.Element => this.createLink("", hash)
            )}
            {this.createLink("blog", "blog")}
          </Row>
        </Container>
      </nav>
    );
  }

  private createLink(link: string, hash: string): JSX.Element {
    return (
      <Col md="auto" className="nav-button option">
        <NavHashLink
          activeClassName="nav-active"
          smooth
          to={`/${link}#${hash}`}
        >
          {hash}
        </NavHashLink>
      </Col>
    );
  }
}
