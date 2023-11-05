/** @jsxImportSource theme-ui */
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useInjection } from 'inversify-react';
import { event } from 'nextjs-google-analytics';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import React, { useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';

import { IDateService } from '@Services/DateService';

import { CVPdf } from '@Cv/index';

import { Reveal } from '@Common/Reveal';
import { Section } from '@Common/Section';
import { centeredStyle } from '@Common/UtilComponents';

import { useAppContext } from '../hooks/AppContext';

// This is quite dumb but works
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CVPreview: React.FC = (): JSX.Element => {
  const { cv } = useAppContext();

  const dateService = useInjection(IDateService.$);

  const renderPDF = useCallback(
    async (url: string, canvas: HTMLCanvasElement) => {
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
        canvasContext: ctx as any,
        transform,
        viewport,
      });
    },
    [],
  );

  return (
    <Section id="cv" title="Download my CV">
      <Row
        sx={{
          marginY: 30,
        }}
      >
        <Col>Please click or tap on the preview below to receive a copy 🙏</Col>
      </Row>
      <Row
        sx={{
          marginY: [10, 20, 20],
        }}
      >
        <Col
          sx={{
            ...centeredStyle,
          }}
        >
          <Reveal direction="up" delay={0.2}>
            <PDFDownloadLink
              document={<CVPdf cv={cv} />}
              fileName={`daniel_william_clarke_cv_${dateService.CurrentTimestamp()}.pdf`}
              onClick={() =>
                event('dc_user_event', {
                  category: 'CV download',
                  label: 'Via preview',
                })
              }
            >
              {({ url }: { url?: string }) => {
                if (!url) {
                  return undefined;
                }

                return (
                  <canvas
                    sx={{
                      borderRadius: 12,
                      marginY: 20,
                      transition: '0.5s',
                      boxShadow: '0 0 25px shadow',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
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
  );
};

export default CVPreview;
