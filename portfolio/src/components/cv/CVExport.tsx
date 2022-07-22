import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { resolve } from "inversify-react";

import * as pdfjs from "pdfjs-dist/legacy/build/pdf.js";

import { CVProps } from "../../model/CVModel";
import { IDateService } from "../../services/DateService";

import { CV } from "./sections/CV";

// This is quite dumb but works
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

export default class CVExport extends React.Component<CVProps> {
  @resolve(IDateService.$) private readonly dateService!: IDateService;

  constructor(props: CVProps, context: {}) {
    super(props, context);
    this.dateService.format("DD-MM-YYYYTHH:mm:ss");
  }

  render(): JSX.Element {
    const filename = `daniel_william_clarke_cv_${this.dateService.CurrentTimestamp()}.pdf`;

    return (
      <PDFDownloadLink
        className="export-cv"
        document={CV.render(this.props.cv, this.dateService)}
        fileName={filename}
      >
        {({ url, blob }) => {
          if (url && blob) {
            const a = document.createElement("a");
            document.body.appendChild(a);
            url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();

            setTimeout(() => {
              window.open(url!, "_self");
            }, 100);
          }
        }}
      </PDFDownloadLink>
    );
  }

  componentDidMount() {
    const element: HTMLElement = document.getElementsByClassName(
      "export-cv"
    )[0] as HTMLElement;
    element.click();
  }
}
