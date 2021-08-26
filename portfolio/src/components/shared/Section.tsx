import { Component } from "react";
import { Container } from "react-bootstrap";
import { IconType } from "react-icons";

import { Heading } from "./Heading";

type SectionProps = {
    id: string;
    title: string
    icon: IconType
    noSeparator?: boolean;
    bg?: string;
};

export class Section extends Component<SectionProps> {
    render(): JSX.Element {
        return (
            <section
                id={this.props.id}
                className={`${this.props.bg ?? "section"} ${this.props.id}`}>
                <Container>
                    <Heading title={this.props.title} noSeparator={this.props.noSeparator} />
                    {this.props.children}
                    <div className="centered short-line" />
                    <this.props.icon className="section-icon" />
                </Container>
            </section>
        )
    }
}