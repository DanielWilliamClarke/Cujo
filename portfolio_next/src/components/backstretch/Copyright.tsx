/** @jsxImportSource theme-ui */

import { useInjection } from 'inversify-react';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IDateService } from '../../services/DateService';
import { Section } from '../shared/Section';
import { Copyright as CopyrightSymbol, ShortLine } from '../shared/UtilComponents'

type NameProps = {
  name: string
};

export const Copyright: React.FC<NameProps> = ({ name }: NameProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);

  return (
    <Section id='copyright' hideIcon>
      <Container fluid>
        <Row
          sx={{
            marginY: 10,
            textAlign: ['center', undefined, undefined]
          }}
        >
          <Col>
            <span>Copyright</span>
            <CopyrightSymbol s />
            <span>{dateService.CurrentYear()} {name}</span>
          </Col>
        </Row>
        <ShortLine centered />
      </Container>
    </Section>
  );
};
