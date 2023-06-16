import { useInjection } from 'inversify-react';
import React, { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { event } from "nextjs-google-analytics";

import { Zoom } from 'react-awesome-reveal';

import { Profile } from '../../model/CVModel';
import { IContactService } from '../../services/ContactService';
import { DevIconName } from '../shared/DevIcon';
import { Section } from '../shared/Section';
import { DividerProps } from '../shared/TriangleDivider';
import ThemeContext from '../theme/ThemeContext';

import { Reveal } from '../shared/Reveal';
import styles from '../shared/style.module.scss';

type ContactProps = {
  profiles: Profile[]
}

export const Contact: React.FC<ContactProps> = ({ profiles }: ContactProps): JSX.Element => {
  const contactService = useInjection(IContactService.$);
  const { theme } = useContext(ThemeContext);
  const [status, setStatus] = useState(false);

  const divider = useMemo<DividerProps>(() => ({
    background: styles[`${theme}-colorBrand`],
    foreground: styles[`${theme}-colorLightBg`]
  }), [theme]);

  const handleSubmit = useCallback(async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const status = await contactService.submit(
      new FormData(event.target)
    );
    event.target.reset();
    setStatus(status);
  }, [contactService]);

  return (
    <Reveal direction='up'>
      <Section
        id="contact"
        title="Contact"
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
                key={p.url}
                onClick={() => {
                  event("event", {
                    category: "Contact click-through",
                    label: `Click through to: ${p.url}`
                  });
                }}
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
                <h3>Get in touch!</h3>
              </Col>
            </Row>
            <Form onSubmit={async () => handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  name="email"
                  className="contact-input"
                  placeholder="email"
                />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={5}
                  className="contact-input"
                  placeholder="message"
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
    </Reveal>
  );
};
