/** @jsxImportSource theme-ui */

import { useInjection } from 'inversify-react';
import { event } from 'nextjs-google-analytics';
import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { Zoom } from 'react-awesome-reveal';

import { Profile } from '@Models/CVModel';
import { IContactService } from '@Services/ContactService';
import { DevIconName } from '@Common/DevIcon';
import { Section } from '@Common/Section';
import { DividerProps } from '@Common/TriangleDivider';
import ThemeContext from '../theme/ThemeContext';

import { centeredStyle, LongLine } from '@Common/UtilComponents';
import { usePositionContext } from '@Hooks/PositionContext';

type ContactProps = {
  profiles: Profile[];
};

export const Contact: React.FC<ContactProps> = ({
  profiles,
}: ContactProps): JSX.Element => {
  const contactService = useInjection(IContactService.$);
  const { theme } = useContext(ThemeContext);
  const [status, setStatus] = useState(false);
  const { even } = usePositionContext();

  const divider = useMemo<DividerProps>(
    () => ({
      background: 'primary',
      foreground: even ? 'bgLight' : 'bgDark',
    }),
    [theme],
  );

  const handleSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      const status = await contactService.submit(new FormData(event.target));
      event.target.reset();
      setStatus(status);
    },
    [contactService],
  );

  return (
    <Section
      id="contact"
      title="Contact"
      withDivider={divider}
      coloring={{
        backgroundColor: 'accent',
        color: 'contactText',
      }}
    >
      <Row
        sx={{
          marginY: [10, 20, 20],
          justifyContent: 'center',
        }}
      >
        {profiles.map(
          (p: Profile): JSX.Element => (
            <a
              href={p.url}
              rel="noopener noreferrer"
              target="_blank"
              key={p.url}
              onClick={() => {
                event('dc_user_event', {
                  category: 'Contact click-through',
                  label: `Click through to: ${p.url}`,
                });
              }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 175,
                width: 175,
                transition: '0.5s',
                borderRadius: '50%',
                marginX: 10,

                '&:hover': {
                  backgroundColor: 'contactText',
                },
                '&:link,&:visited': {
                  textDecoration: 'none',
                  color: 'contactText',
                },
              }}
            >
              <DevIconName
                icon={p.brand}
                size={75}
                color="contactText"
                hoverColor="primary"
                sx={{
                  width: '100%',
                  '&:hover': {
                    transform: 'scale(1.2)',
                    transitionDelay: '0.1s',
                  },
                }}
                textStyle={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  margin: '0.2rem',
                }}
              />
            </a>
          ),
        )}
      </Row>

      <LongLine
        centered
        sx={{
          backgroundColor: 'contactText',
        }}
      />

      <Row
        sx={{
          marginY: [10, 20, 20],
        }}
      >
        <div
          sx={{
            ...centeredStyle,
            width: 500,
          }}
        >
          <Row>
            <Col>
              <h3
                sx={{
                  color: 'contactText',
                  textAlign: 'center',
                }}
              >
                Get in touch!
              </h3>
            </Col>
          </Row>
          <Form onSubmit={async () => handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="email"
                sx={{
                  marginY: 10,
                  backgroundColor: 'contactText',
                  color: 'contactInput',
                  border: '1px solid bgDark',

                  '&:focus': {
                    backgroundColor: 'contactText',
                    color: 'contactInput',
                  },
                }}
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Control
                as="textarea"
                name="message"
                rows={5}
                placeholder="message"
                sx={{
                  marginY: 10,
                  backgroundColor: 'contactText',
                  color: 'contactInput',
                  border: '1px solid bgDark',

                  '&:focus': {
                    backgroundColor: 'contactText',
                    color: 'contactInput',
                  },
                }}
              />
            </Form.Group>
            <Button
              variant="outline-dark"
              type="submit"
              sx={{
                width: '100%',
              }}
            >
              Send
            </Button>
          </Form>
        </div>
      </Row>

      {status && (
        <Zoom>
          <div
            sx={{
              paddingBottom: 15,
              transition: '2s',
            }}
          >
            Thanks!
          </div>
        </Zoom>
      )}
    </Section>
  );
};
