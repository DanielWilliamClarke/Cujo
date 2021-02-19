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
      <nav style={this.props.style} className="Nav-panel">
        <div className="Nav-container Nav-logo">
          <img src={logo} alt="logo" />
        </div>
        <Container>
          <Row className="Nav-container">
            {["about", "technical", "experience", "education", "projects"].map(
              (hash: string): JSX.Element => this.createLink("", hash)
            )}
            {this.createLink("blog", "blog")}
            {this.createLink("contact", "contact")}
          </Row>
        </Container>
      </nav>
    );
  }

  private createLink(link: string, hash: string): JSX.Element {
    return (
      <Col className="Col-item option">
        <div className="Nav-button">
          <NavHashLink
            activeClassName="Nav-active"
            smooth
            to={`/${link}#${hash}`}
          >
            {hash}
          </NavHashLink>
          <div className="active" />
        </div>
      </Col>
    );
  }
}
