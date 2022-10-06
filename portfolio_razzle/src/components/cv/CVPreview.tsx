import React, { useCallback } from "react";
import { Fade } from "react-awesome-reveal";
import { Row, Col } from "react-bootstrap";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useInjection } from "inversify-react";

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.js";
import pdfjsWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

import { CVProps } from "../../model/CVModel";
import { IDateService } from "../../services/DateService";
import { Section } from "../shared/Section";

import { CV } from "./sections/CV";

import "./CVPreview.scss";

const CVPreview: React.FC<CVProps> = ({ cv }: CVProps): JSX.Element => {

  // // This is quite dumb but works
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  console.log("rendered in server")
  const dateService = useInjection(IDateService.$);

  const renderPDF = useCallback(async (url: string, canvas: HTMLCanvasElement) => {
    if (!url || !canvas) {
      return;
    }

    console.log(url);
    console.log(canvas);

    const pdfDocument = await pdfjs.getDocument(url).promise;
    const page = await pdfDocument.getPage(1);

    var scale = 1.0;
    var viewport = page.getViewport({ scale: scale });
    // Support HiDPI-screens.
    var outputScale = window.devicePixelRatio || 1;

    const ctx = canvas.getContext("2d");

    console.log(viewport.width)

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
  }, []);

  return (
    <Fade triggerOnce direction="up">
      <Section id="cv" bg="section-light" title="Download my CV">
        <Row>
          <Col>
            Please click or tap on the preview below to receive a copy 🙏
          </Col>
        </Row>
        <Row className="section-content">
          <Col className="centered featured">
            <Fade triggerOnce direction="up" delay={0.2}>
              <PDFDownloadLink
                document={CV.render(cv, dateService)}
                fileName={`daniel_william_clarke_cv.pdf`}
              >
                {({ url }) => {
                  if (!url) {
                    return <></>;
                  }

                  return (
                    <canvas
                      className="pdf-canvas"
                      ref={(canvas: HTMLCanvasElement) =>
                        renderPDF(url, canvas)
                      }
                    />
                  );
                }}
              </PDFDownloadLink>
            </Fade>
          </Col>
        </Row>
      </Section>
    </Fade>
  );
};

export default CVPreview;