import p5 from "p5";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import hex from "../../sketches/hex";
import waves from "../../sketches/waves";

import { CVProps } from "../../model/CVModel";

import "./SketchBackstretch.scss";

export class SketchBackstretch extends Component<CVProps> {
    private myRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        new p5(hex, this.myRef.current)
        new p5(waves, this.myRef.current)
    }

    render() {
        return (
            <Container fluid ref={this.myRef} className="sketch-backstretch">
                <div>
                    <Row className="backstretch-main">
                        <Col>{this.props.cv.basics.name}</Col>
                    </Row>
                    <div className="centered line"></div>
                    <Row className="backstretch-tag">
                        <Col>{this.props.cv.basics.label}</Col>
                    </Row>
                </div>
            </Container>
        )
    }
}
