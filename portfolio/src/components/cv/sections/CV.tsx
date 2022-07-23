import React from "react";
import { Document, StyleSheet, Page, View, Font } from "@react-pdf/renderer";
import { IDateService } from "../../../services/DateService";

import styles from "../../shared/style.module.scss";
import { CV as CVModel, Work } from "../../../model/CVModel";

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

Font.registerHyphenationCallback(word => (
  [word]
));

export namespace CV {
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
      paddingHorizontal: 15,
      paddingVertical: 8,
      width: "50%",
    },
    right: {
      paddingHorizontal: 15,
      paddingVertical: 8,
      width: "50%",
      backgroundColor: styles.colorOffWhite,
    },
  });

  export const render = (cv: CVModel, dateService: IDateService): JSX.Element => {
    const experience = cv.work.entries
      .filter(
        ({ startDate }: Work) => !dateService.IsFuture(startDate.toString())
      )
      .sort(
        (a: Work, b: Work) =>
          dateService.toUnix(b.startDate.toString()) -
          dateService.toUnix(a.startDate.toString())
      );

    return (
      <Document>
        <Page style={pdfStyles.body} size="A4" wrap={false}>
          {Heading.render(cv, dateService)}
          {Intro.render(cv)}
          <View style={pdfStyles.contentRow}>
            <View style={pdfStyles.left}>
              {Skills.render(cv)}
              {Education.render(cv)}
            </View>
            <View style={pdfStyles.right}>
              {Experience.render(experience.slice(0, 2))}
            </View>
          </View>
        </Page>
        <Page style={pdfStyles.body} size="A4" wrap={false}>
          <View style={pdfStyles.contentRow}>
            <View style={pdfStyles.left}>
              {Experience.render(experience.slice(2, 6), true)}
            </View>
            <View style={pdfStyles.right}>
              {Experience.render(experience.slice(6), true)}
              {Interests.render(cv)}
            </View>
          </View>
          {Outro.render(cv)}
        </Page>
      </Document>
    );
  }
}
