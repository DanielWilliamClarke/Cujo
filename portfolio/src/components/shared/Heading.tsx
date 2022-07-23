import React from "react";
import { Col, Row } from "react-bootstrap";

type HeadingProps = {
  title: string;
  noSeparator?: boolean;
};

export const Heading: React.FC<HeadingProps> = ({ title, noSeparator}: HeadingProps): JSX.Element => {
  return (
    <Row>
      <Col>
        <h2 className="section-title">{title}</h2>
        {!noSeparator && <div className="centered line" />}
      </Col>
    </Row>
  );
};
