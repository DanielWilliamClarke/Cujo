import React from "react";
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

export class CVExport extends React.Component<CVProps> {
  @resolve("DateService") private readonly dateService!: IDateService;

  constructor(props: CVProps, context: {}) {
    super(props, context);
    this.dateService.format("DD-MM-YYYYTHH:mm:ss");
  }

  render(): JSX.Element {
    const filename = `daniel_william_clarke_cv_${this.dateService.CurrentTimestamp()}.pdf`

    return (
        <PDFDownloadLink
          className="export-cv"
          document={this.generate()}
          fileName={filename}
        >
          {({ url, blob }) => {
            if (url && blob) {
              const a = document.createElement("a");
              document.body.appendChild(a);
              url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = filename;
              //a.click();
              
              setTimeout(() => {
                window.open(url!, '_self')
              }, 100);
            }
          }}
        </PDFDownloadLink>
    );
  }

  componentDidMount() {
    const element: HTMLElement = document.getElementsByClassName('export-cv')[0] as HTMLElement;
    element.click();
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
