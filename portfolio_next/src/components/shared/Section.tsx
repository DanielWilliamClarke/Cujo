/** @jsxImportSource theme-ui */

import { useInjection } from 'inversify-react';
import React from 'react';
import { Container } from 'react-bootstrap';
import { IIconService } from '../../services/IconService';

import { Heading } from './Heading';
import { DividerProps, TriangleDivider } from './TriangleDivider';
import { usePositionContext } from './PositionContext';
import { ShortLine } from './UtilComponents';


const headingBaseStyle = {
  fontWeght: 700,
  textTransform: 'capitalize',
  color: 'textHeading'
}

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
    margin: '0.5rem 0'
  }
};


type SectionProps = {
  id: string
  title: string
  noSeparator?: boolean
  withDivider?: DividerProps
  children?: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({
  children,
  ...props
}: SectionProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault(props.id);

  const { even } = usePositionContext();

  const backgroundColor = even ? 'bgDark' : 'bgLight';

  return (
    <section
      id={props.id}
      className={props.id}
      sx={{
        margin: '0 auto',
        paddingY: 75,
        position: 'relative',
        color: 'text',
        ...headingStyles,
        backgroundColor
      }}
    >
      {props.withDivider && (
        <TriangleDivider
          {...{
            ...props.withDivider,
            foreground: backgroundColor
          }}
        />
      )}
      <Container>
        <Heading
          title={props.title}
          noSeparator={props.noSeparator}
        />
        {children}
        <ShortLine centered />
      </Container>
      <Icon
        className="centered"
        sx={{
          fontSize: 'calc(20px + 0.25vw)',
          marginTop: 20,
          width: 'calc(20px + .25vw)',
          color: even ? 'accent' : 'secondary'
        }}
      />
    </section>
  );
};
