import p5 from "p5";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import sketch from "../../sketches/test";

import "./Backstretch.scss";

export class SketchBackstretch extends Component<any> {
    private myRef: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        new p5(sketch, this.myRef.current)
    }

    render() {
        return (
            <div ref={this.myRef} />
        )
    }
}
