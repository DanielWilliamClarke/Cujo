/** @jsxImportSource theme-ui */

import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { anton } from '../shared/Font';
import { usePositionContext } from './PositionContext';
import { GenericComponentProps } from './props';
import { Line } from './UtilComponents';

type HeadingProps = GenericComponentProps & {
  title: string
  noSeparator?: boolean
}

export const Heading: React.FC<HeadingProps> = ({
  position = 0,
  title,
  noSeparator
}: HeadingProps): JSX.Element => {
  const { even } = usePositionContext();

  return (
    <Row>
      <Col>
        <h2
          className={`${anton.className}`}
          sx={{
            color: 'textTitle',
            display: 'block',
            fontSize: '2.25em',
            fontWeight: 700,
            margin: '0 0 15px',
            padding: 0,
            textAlign: 'center',
            textTransform: 'capitalize'
          }}
        >
          {title}
        </h2>
        {!noSeparator && (
          <Line centered />
        )}
      </Col>
    </Row>
  );
};
