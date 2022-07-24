import p5 from "p5";
import React, { useEffect, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useInjection } from "inversify-react";
import { IDateService } from "../../services/DateService";
import { getSketch } from "../../sketches";
import { CVProps, Work } from "../../model/CVModel";

import "./SketchBackstretch.scss";

import { ScrollIndicator } from "./ScrollIndicator";
import { DynamicImage } from "../shared/DynamicImage";

export const SketchBackstretch: React.FC<CVProps> = ({ cv }: CVProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format("MMMM YYYY", "YYYY-MM-DD")

  // Similar to componentDidMount and componentDidUpdate:
  const p5Ref = useMemo(() => React.createRef<any>(), []);
  useEffect(() => {
    new p5(getSketch(), p5Ref.current);
  }, [p5Ref]);

  const currentRole = useMemo(() => {
    return cv.work.entries
      .filter(
        ({ startDate }: Work) =>
          !dateService.IsFuture(startDate.toString())
      )
      .sort(
        (a, b) =>
          dateService.toUnix(b.startDate.toString()) -
          dateService.toUnix(a.startDate.toString())
      )[0]
  }, [cv.work.entries, dateService]);

  return (
    <section id="home">
      <Container fluid ref={p5Ref} className="sketch-backstretch">
        <div className="backstretch-headline">
          <Row className="backstretch-main">
            <Col>{cv.about.entry.name}</Col>
          </Row>
          <div className="centered line"></div>
          <Row className="backstretch-tag">
            <Col>{cv.about.entry.label}</Col>
          </Row>
          <Row className="backstretch-logo">
            <Col>
              <DynamicImage
                image={currentRole.logo.file.url}
                alt={currentRole.company}
                className="centered image-item work-logo"
              />
            </Col>
          </Row>
        </div>
      </Container>
      <Container fluid className="scroll-indicator">
        <ScrollIndicator />
      </Container>
    </section>
  );
}
