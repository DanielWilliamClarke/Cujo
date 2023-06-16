import React, { useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useInjection } from 'inversify-react';
import { event } from "nextjs-google-analytics";

import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.js';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';

import { CVProps } from '../../model/CVModel';
import { IDateService } from '../../services/DateService';

import { CV } from './sections/CV';

// This is quite dumb but works
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CVExport: React.FC<CVProps> = ({ cv }: CVProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('DD-MM-YYYYTHH:mm:ss');
  const filename = `daniel_william_clarke_cv_${dateService.CurrentTimestamp()}.pdf`;

  useEffect(() => {
    const element: HTMLElement = document.getElementsByClassName(
      'export-cv'
    )[0] as HTMLElement;
    element.click();
  });

  return (
    <PDFDownloadLink
      className="export-cv"
      document={CV.render(cv, dateService)}
      fileName={filename}
    >
      {({ url, blob }) => {
        if (url && blob) {
          const a = document.createElement('a');
          document.body.appendChild(a);
          url = URL.createObjectURL(blob);
          a.href = url;
          a.download = filename;
          a.click();

          event("user_engagement", {
            category: "CV",
            label: "Direct CV download",
          });

          setTimeout(() => {
            window.open(url!, '_self');
          }, 100);

          return null;
        }
      }}
    </PDFDownloadLink>
  );
};

export default CVExport;
