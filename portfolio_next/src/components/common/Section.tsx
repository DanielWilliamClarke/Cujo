/** @jsxImportSource theme-ui */

import { useInjection } from 'inversify-react';
import React from 'react';
import { Container } from 'react-bootstrap';
import { IIconService } from '@Services/IconService';

import { Heading, SectionColouring } from './Heading';
import { DividerProps, TriangleDivider } from './TriangleDivider';
import { usePositionContext } from '@Hooks/PositionContext';
import { centeredStyle, ShortLine } from './UtilComponents';

const headingBaseStyle = {
  fontWeght: 700,
  textTransform: 'capitalize',
};

const headingStyles = {
  h3: {
    fontSize: '1.5em',
    ...headingBaseStyle,
  },

  h4: {
    fontSize: '1em',
    ...headingBaseStyle,
  },

  h5: {
    fontSize: '0.85em',
    ...headingBaseStyle,
  },

  h6: {
    fontSize: '0.75em',
    ...headingBaseStyle,
  },

  p: {
    margin: '0.5rem 0',
  },
};

type SectionProps = {
  id: string;
  title?: string;
  hideIcon?: boolean;
  noSeparator?: boolean;
  withDivider?: DividerProps;
  children?: React.ReactNode;
  coloring?: SectionColouring;
};

export const Section: React.FC<SectionProps> = ({
  children,
  ...props
}: SectionProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault(props.id);

  const { even } = usePositionContext();

  return (
    <section
      id={props.id}
      className={props.id}
      sx={{
        margin: '0 auto',
        paddingY: 75,
        position: 'relative',
        ...headingStyles,
        ...(props.coloring ?? {
          color: 'text',
          backgroundColor: even ? 'bgDark' : 'bgLight',
        }),
      }}
    >
      {props.withDivider && <TriangleDivider {...props.withDivider} />}
      <Container>
        {props.title && (
          <Heading
            title={props.title}
            noSeparator={props.noSeparator}
            coloring={props.coloring}
          />
        )}
        {children}
        <ShortLine centered colorOverride={props.coloring?.color} />
      </Container>
      {!props.hideIcon && (
        <Icon
          sx={{
            ...centeredStyle,
            display: 'block !important',
            fontSize: 'calc(20px + 0.25vw)',
            marginTop: 20,
            width: 'calc(20px + .25vw)',
            color: props.coloring?.color ?? (even ? 'accent' : 'secondary'),
          }}
        />
      )}
    </section>
  );
};
