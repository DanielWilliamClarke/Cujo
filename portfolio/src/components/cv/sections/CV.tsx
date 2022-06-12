import React from "react";
import { Document, StyleSheet, Page, View } from "@react-pdf/renderer";
import { IDateService } from "../../../services/DateService";

import styles from "../../shared/style.module.scss";
import { CV as CVModel } from "../../../model/CVModel";

import { Heading } from "./Heading";
import { Intro } from "./Intro";
import { Content } from "./Content";
import { Skills } from "./Skills";

const pdfStyles = StyleSheet.create({
  body: {
    fontFamily: "Helvetica",
  },
  contentRow: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
  },
  left: {
    padding: 15,
    width: "50%", //<- working alternative
    // flexGrow: 0,
    // flexShrink: 1,
    // flexBasis: 200,
  },
  right: {
    padding: 15,
    width: "50%", //<- working alternative
    backgroundColor: styles.colorOffWhite,
    // flexShrink: 1,
    // flexGrow: 0,
  },
});

export class CV {
  static render(cv: CVModel, dateService: IDateService): JSX.Element {
    return (
      <Document>
        <Page style={pdfStyles.body} size="A4">
          {Heading.render(cv, dateService)}
          {Intro.render(cv)}
          <View style={pdfStyles.contentRow}>
            <View style={pdfStyles.left}>{Skills.render(cv, dateService)}</View>
            <View style={pdfStyles.right}>{Content.render()}</View>
          </View>
        </Page>
      </Document>
    );
  }
}
