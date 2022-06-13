import React from "react";
import { Document, StyleSheet, Page, View, Font } from "@react-pdf/renderer";
import { IDateService } from "../../../services/DateService";

import styles from "../../shared/style.module.scss";
import { CV as CVModel } from "../../../model/CVModel";

import { Heading } from "./Heading";
import { Intro } from "./Intro";
import { Skills } from "./Skills";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Outro } from "./Outro";
import { Interests } from "./Interests";

Font.registerEmojiSource({
  format: "png",
  url: "https://twemoji.maxcdn.com/2/72x72/",
});

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
    width: "50%",
  },
  right: {
    padding: 15,
    width: "50%",
    backgroundColor: styles.colorOffWhite,
  },
});

export class CV {
  static render(cv: CVModel, dateService: IDateService): JSX.Element {
    return (
      <Document>
        <Page style={pdfStyles.body} size="A4" wrap>
          {Heading.render(cv, dateService)}
          {Intro.render(cv)}
          <View style={pdfStyles.contentRow}>
            <View style={pdfStyles.left}>
              {Skills.render(cv)}
              {Education.render(cv)}
              <View style={{ height: 30 }} />
              {Experience.render(cv.work.entries.slice(3))}
            </View>
            <View style={pdfStyles.right}>
              {Experience.render(cv.work.entries.slice(0, 3))}
              <View style={{ height: 30 }} />
              {Interests.render(cv)}
            </View>
          </View>
          {Outro.render(cv)}
        </Page>
      </Document>
    );
  }
}
