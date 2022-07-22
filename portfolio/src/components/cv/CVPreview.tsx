import React from "react";
import { Fade } from "react-awesome-reveal";
import { Row, Col } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { resolve } from "inversify-react";

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.js";

import { CVProps } from "../../model/CVModel";
import { IDateService } from "../../services/DateService";
import { Section } from "../shared/Section";

import { CV } from "./sections/CV";

import "./CVPreview.scss";

// This is quite dumb but works
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

export default class CVPreview extends React.Component<CVProps> {
  @resolve(IDateService.$) private readonly dateService!: IDateService;

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
                  document={CV.render(this.props.cv, this.dateService)}
                  fileName={`daniel_william_clarke_cv_${this.dateService.CurrentTimestamp()}.pdf`}
                >
                  {({ url }) => {
                    if (!url) {
                      return <></>;
                    }

                    return (
                      <canvas
                        className="pdf-canvas"
                        ref={(canvas: HTMLCanvasElement) =>
                          this.renderPDF(url!, canvas)
                        }
                      ></canvas>
                    );
                  }}
                </PDFDownloadLink>
              </Fade>
            </Col>
          </Row>
        </Section>
      </Fade>
    );
  }

  private async renderPDF(url: string, canvas: HTMLCanvasElement) {
    if (!url || !canvas) {
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

    var transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

    page.render({
      canvasContext: ctx as Object,
      transform: transform,
      viewport: viewport,
    });
  }
}
