import { resolve } from "inversify-react";
import { Component } from "react";
import { Container } from "react-bootstrap";
import { IconWithDefaultState, IIconService } from "../../services/IconService";

import { Heading } from "./Heading";
import { DividerProps, TriangleDivider } from "./TriangleDivider";

type SectionProps = {
  id: string;
  title: string;
  noSeparator?: boolean;
  bg?: string;
  withDivider?: DividerProps;
};

export class Section extends Component<SectionProps, IconWithDefaultState> {
  @resolve("IconService") private readonly iconService!: IIconService;

  constructor(props: SectionProps, context: {}) {
    super(props, context);
    this.state = { icon: this.iconService.getWithDefault(this.props.id) };
  }

  render(): JSX.Element {
    return (
      <>
        {this.props.withDivider && (
          <TriangleDivider {...this.props.withDivider} />
        )}
        <section
          id={this.props.id}
          className={`${this.props.bg ?? "section"} ${this.props.id}`}
        >
          <Container>
            <Heading
              title={this.props.title}
              noSeparator={this.props.noSeparator}
            />
            {this.props.children}
            <div className="centered short-line" />
            <this.state.icon className="section-icon" />
          </Container>
        </section>
      </>
    );
  }
}
