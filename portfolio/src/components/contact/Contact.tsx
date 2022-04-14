import { resolve } from "inversify-react";
import React, { ChangeEvent } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import { Fade, Zoom } from "react-awesome-reveal";

import { Profile } from "../../model/CVModel";
import { IContactService } from "../../services/ContactService";
import { DevIconName } from "../shared/DevIcon";
import { Section } from "../shared/Section";
import { withDividerState } from "../shared/TriangleDivider";

import "./Contact.scss";
import styles from "../shared/style.module.scss";

type ContactProps = {
  profiles: Profile[];
};

type ContactState = {
  status: boolean;
};

export class Contact extends React.Component<
  ContactProps,
  ContactState & withDividerState
> {
  @resolve("ContactService") private readonly contactService!: IContactService;

  constructor(props: ContactProps) {
    super(props);
    this.state = {
      status: false,
      divider: {
        background: styles.colorBrand,
        foreground: styles.colorLightBg,
      },
    };
  }

  render(): JSX.Element {
    return (
      <Fade triggerOnce direction="up">
        <Section
          id="profiles"
          title="Profiles"
          withDivider={this.state.divider}
        >
          <Row className="section-content socials">
            {this.props.profiles.map(
              (p: Profile): JSX.Element => (
                <a
                  className="social-platform"
                  href={p.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <DevIconName icon={p.brand} />
                </a>
              )
            )}
          </Row>

          <div className="centered long-line" />

          <Row className="section-content">
            <div className="contact-form centered">
              <Row className="form-title">
                <Col>
                  <h3>Send me a message!</h3>
                </Col>
              </Row>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    className="contact-input"
                    placeholder="Your email"
                  />
                </Form.Group>
                <Form.Group controlId="formMessage">
                  <Form.Control
                    as="textarea"
                    name="message"
                    rows={5}
                    className="contact-input"
                    placeholder="Your Message"
                  />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                  Send
                </Button>
              </Form>
            </div>
          </Row>

          {this.state.status && (
            <Zoom>
              <div className="contact-response">Thanks!</div>
            </Zoom>
          )}
        </Section>
      </Fade>
    );
  }

  private async handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const success = await this.contactService.submit(
      new FormData(event.target)
    );
    event.target.reset();
    this.setState({ status: success });
  }
}
