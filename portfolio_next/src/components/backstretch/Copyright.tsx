import React from 'react';
import { useInjection } from 'inversify-react';
import { Container, Row, Col } from 'react-bootstrap';
import { IDateService } from '../../services/DateService';

type NameProps = { 
  name: string 
};

export const Copyright: React.FC<NameProps> = ({ name }: NameProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);

  return (
    <section className="section copyright-footer">
    <Container fluid>
      <Row>
        <Col>
          <span className="copyright">Copyright</span>
          <span>{dateService.CurrentYear()} {name}</span>
        </Col>
      </Row>
      <div className="centered short-line" />
    </Container>
  </section>
  );
};
