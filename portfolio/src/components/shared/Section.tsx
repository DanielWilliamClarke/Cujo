import { useInjection } from "inversify-react";
import React from "react";
import { Container } from "react-bootstrap";
import { IIconService } from "../../services/IconService";

import { Heading } from "./Heading";
import { DividerProps, TriangleDivider } from "./TriangleDivider";

type SectionProps = {
  id: string;
  title: string;
  noSeparator?: boolean;
  bg?: string;
  withDivider?: DividerProps;
  children?: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({ children, ...props }: SectionProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  const Icon = iconService.getWithDefault(props.id);

  return (
    <section
      id={props.id}
      className={`${props.bg ?? "section"} ${props.id}`}
    >
      {props.withDivider && (
        <TriangleDivider {...props.withDivider} />
      )}
      <Container>
        <Heading
          title={props.title}
          noSeparator={props.noSeparator}
        />
        {children}
        <div className="centered short-line" />
        <Icon className="section-icon" />
      </Container>
    </section>
  );
};
