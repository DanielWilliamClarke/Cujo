import { useInjection } from "inversify-react";
import React, { ChangeEvent, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import { Fade, Zoom } from "react-awesome-reveal";

import { Profile } from "../../model/CVModel";
import { IContactService } from "../../services/ContactService";
import { DevIconName } from "../shared/DevIcon";
import { Section } from "../shared/Section";

import "./Contact.scss";
import styles from "../shared/style.module.scss";

type ContactProps = {
  profiles: Profile[];
};

export const Contact: React.FC<ContactProps> = ({ profiles }: ContactProps): JSX.Element => {
  const contactService = useInjection(IContactService.$);
  const [status, setStatus] = useState(false);
  const divider = {
    background: styles.colorBrand,
    foreground: styles.colorDarkBg,
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const status = await contactService.submit(
      new FormData(event.target)
    );
    event.target.reset();
    setStatus(status);
  }

  return (
    <Fade triggerOnce direction="up">
      <Section
        id="profiles"
        title="Profiles"
        withDivider={divider}
      >
        <Row className="section-content socials">
          {profiles.map(
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
            <Form onSubmit={handleSubmit}>
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

        {status && (
          <Zoom>
            <div className="contact-response">Thanks!</div>
          </Zoom>
        )}
      </Section>
    </Fade>
  );
}