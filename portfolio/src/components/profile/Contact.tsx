import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { Profile } from "../../model/CVModel";
import { DevIconName } from "../shared/DevIcon";

import "./Contact.scss";

const Fade = require("react-reveal/Fade");

type ContactProps = {
  profiles: Profile[];
};

type ContactState = {
  status: string;
};

export class Contact extends Component<ContactProps, ContactState> {
  componentWillMount(): void {
    this.setState({ status: "" });
  }

  render(): JSX.Element {
    return (
      <Fade bottom>
        <section id="contact" className="section contact">
          <Container>
            <Row>
              <Col>
                <h2 className="section-title">Contact</h2>
                <div className="centered line" />
              </Col>
            </Row>

            <Row className="section-content socials">
              {this.props.profiles.map(
                (p: Profile): JSX.Element => (
                  <Col md="auto" className="social-platform">
                    <a href={p.url} rel="noopener noreferrer" target="_blank">
                      <DevIconName icon={p.brand} />
                    </a>
                  </Col>
                )
              )}
            </Row>

            <div className="centered long-line" />

            <Row className="section-content">
              <div className="contact-form centered">
                <Row className="form-title">
                  <Col>
                    <h3>Get in touch!</h3>
                  </Col>
                </Row>
                <Form
                  onSubmit={this.handleSubmit.bind(this)}
                  action="https://formspree.io/f/xjvpddee"
                  method="POST"
                >
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

            <div className="centered short-line" />
          </Container>
        </section>
      </Fade>
    );
  }

  handleSubmit(event: any) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}
