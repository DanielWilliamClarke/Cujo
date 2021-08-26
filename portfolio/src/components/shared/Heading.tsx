import { Component } from "react";
import { Col, Row } from "react-bootstrap";

type HeadingProps = {
    title: string;
    noSeparator?: boolean;
};

export class Heading extends Component<HeadingProps> {
    render(): JSX.Element {
        return (
            <Row>
                <Col>
                    <h2 className="section-title">{this.props.title}</h2>
                    {!this.props.noSeparator && <div className="centered line" />}
                </Col>
            </Row>
        )
    }
}