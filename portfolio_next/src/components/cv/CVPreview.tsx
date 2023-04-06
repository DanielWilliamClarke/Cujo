import { PDFDownloadLink } from '@react-pdf/renderer';
import { useInjection } from 'inversify-react';
import React, { useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';

import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

import { CVProps } from '../../model/CVModel';
import { IDateService } from '../../services/DateService';
import { Section } from '../shared/Section';

import { Reveal } from '../shared/Reveal';
import { CV } from './sections/CV';

// This is quite dumb but works
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CVPreview: React.FC<CVProps> = ({ cv }: CVProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);

  const renderPDF = useCallback(async (url: string, canvas: HTMLCanvasElement) => {
    if (!url || !canvas) {
      return;
    }

    console.log(url);
    console.log(canvas);

    const pdfDocument = await pdfjs.getDocument(url).promise;
    const page = await pdfDocument.getPage(1);

    const scale = 1.0;
    const viewport = page.getViewport({ scale });
    // Support HiDPI-screens.
    const outputScale = window.devicePixelRatio || 1;

    const ctx = canvas.getContext('2d');

    console.log(viewport.width);

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);

    canvas.style.maxWidth = Math.floor(viewport.width) + 'px';
    canvas.style.height = 'auto';
    canvas.style.width = '90%';

    const transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

    page.render({
      canvasContext: ctx as Object,
      transform,
      viewport
    });
  }, []);

  return (
    <Reveal direction="up">
      <Section id="cv" title="Download my CV">
        <Row>
          <Col>
            Please click or tap on the preview below to receive a copy 🙏
          </Col>
        </Row>
        <Row className="section-content">
          <Col className="centered featured">
            <Reveal direction="up" delay={0.2}>
              <PDFDownloadLink
                document={CV.render(cv, dateService)}
                fileName={`daniel_william_clarke_cv_${dateService.CurrentTimestamp()}.pdf`}
              >
                {({ url }) => {
                  if (!url) {
                    return <></>;
                  }

                  return (
                    <canvas
                      className="pdf-canvas"
                      ref={async (canvas: HTMLCanvasElement) =>
                        await renderPDF(url, canvas)
                      }
                    />
                  );
                }}
              </PDFDownloadLink>
            </Reveal>
          </Col>
        </Row>
      </Section>
    </Reveal>
  );
};

export default CVPreview;
