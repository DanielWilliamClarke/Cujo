import {
  IconLookup,
  IconName,
  IconPrefix,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Profile } from "../../model/CV";

import "./Contact.scss";

type ContactProps = {
  profiles: Profile[];
};

export class Contact extends Component<ContactProps> {
  render(): JSX.Element {
    return (
      <section id="contact" className="section contact">
        <Container>
          <Row>
            <Col>
              <h2 className="section-title">Contact</h2>
              <div className="centered line" />
            </Col>
          </Row>

          <Row>
            {this.props.profiles.map(
              (p: Profile): JSX.Element => (
                <Col>
                  <div className="dev-icon">
                    <span className={`icon devicon-${p.brand.icon}`} />
                    <p className="icon-name">{p.brand.name}</p>
                  </div>
                </Col>
              )
            )}
          </Row>
        </Container>
      </section>
    );
  }
}
