import React from "react";
import { Fade } from "react-awesome-reveal";
import { Row, Col } from "react-bootstrap";
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
} from "@react-pdf/renderer";
import { resolve } from "inversify-react";

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.js";

import { CVProps } from "../../model/CVModel";
import { IDateService } from "../../services/DateService";
import { Section } from "../shared/Section";

import "./CV.scss";

import { Heading } from "./sections/Heading";
import { Intro } from "./sections/Intro";

// This is quite dumb but works
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

const pdfStyles = StyleSheet.create({
  body: {
    fontFamily: "Helvetica",
  },
});

export class CV extends React.Component<CVProps> {
  @resolve("DateService") private readonly dateService!: IDateService;

  constructor(props: CVProps, context: {}) {
    super(props, context);
    this.dateService.format("DD-MM-YYYYTHH:mm:ss");
  }

  render(): JSX.Element {
    return (
      <Fade triggerOnce direction="up">
        <Section id="cv" bg="section-light" title="Download My CV">
          <Row>
            <Col>
              Please click or tap on the preview below to receive a copy 🙏
            </Col>
          </Row>
          <Row className="section-content">
            <Col className="centered featured">
              <Fade triggerOnce direction="up" delay={0.2}>
                <PDFDownloadLink
                  document={this.generate()}
                  fileName={`daniel_william_clarke_cv_${this.dateService.CurrentTimestamp()}.pdf`}
                >
                  {({ url }) => (
                    <canvas
                      className="pdf-canvas"
                      ref={(canvas: HTMLCanvasElement) =>
                        this.renderPDF(url!, canvas)
                      }
                    ></canvas>
                  )}
                </PDFDownloadLink>
              </Fade>
            </Col>
          </Row>
        </Section>
      </Fade>
    );
  }

  private async renderPDF(url: string, canvas: HTMLCanvasElement) {
    if (!url) {
      return;
    }

    const pdfDocument = await pdfjs.getDocument(url).promise;
    const page = await pdfDocument.getPage(1);

    var scale = 1.0;
    var viewport = page.getViewport({ scale: scale });
    // Support HiDPI-screens.
    var outputScale = window.devicePixelRatio || 1;

    const ctx = canvas.getContext("2d");

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);

    canvas.style.maxWidth = Math.floor(viewport.width) + "px";
    canvas.style.height = "auto";
    canvas.style.width = "90%";

    page.render({
      canvasContext: ctx as Object,
      viewport: viewport,
    });
  }

  private generate(): JSX.Element {
    return (
      <Document>
        <Page style={pdfStyles.body} size="A4">
          {Heading.render(this.props.cv, this.dateService)}
          {Intro.render(this.props.cv)}
        </Page>
      </Document>
    );
  }
}
