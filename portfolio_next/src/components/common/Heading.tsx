/** @jsxImportSource theme-ui */

import React from "react";
import { Col, Row } from "react-bootstrap";

import { anton } from "./Font";
import { Line } from "./UtilComponents";

export type SectionColouring = {
  backgroundColor: string;
  color: string;
};

type HeadingProps = {
  title: string;
  noSeparator?: boolean;
  coloring?: SectionColouring;
};

export const Heading: React.FC<HeadingProps> = ({
  title,
  noSeparator,
  coloring,
}: HeadingProps): JSX.Element => {
  return (
    <Row>
      <Col>
        <h2
          className={`${anton.className}`}
          sx={{
            display: "block",
            fontSize: "2.25em",
            fontWeight: 700,
            margin: "0 0 15px",
            padding: 0,
            textAlign: "center",
            textTransform: "capitalize",
            color: coloring?.color,
          }}
        >
          {title}
        </h2>
        {!noSeparator && <Line centered colorOverride={coloring?.color} />}
      </Col>
    </Row>
  );
};
