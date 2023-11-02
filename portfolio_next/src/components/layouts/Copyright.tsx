/** @jsxImportSource theme-ui */
import { useInjection } from 'inversify-react';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { IDateService } from '@Services/DateService';

import { Section } from '@Common/Section';
import { Copyright as CopyrightSymbol } from '@Common/UtilComponents';

import { useAppContext } from '../hooks/AppContext';

export const Copyright: React.FC = (): JSX.Element => {
  const {
    cv: {
      about: {
        entry: { name },
      },
    },
  } = useAppContext();

  const dateService = useInjection(IDateService.$);

  return (
    <Section id="copyright" hideIcon>
      <Container fluid>
        <Row
          sx={{
            marginY: 10,
            textAlign: ['center', undefined, undefined],
          }}
        >
          <Col>
            <span>Copyright</span>
            <CopyrightSymbol s />
            <span>
              {dateService.CurrentYear()} {name}
            </span>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};
