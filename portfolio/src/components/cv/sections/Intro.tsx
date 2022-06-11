import React, { ReactNode } from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { BLOCKS } from "@contentful/rich-text-types";

import { CV } from "../../../model/CVModel";

// import styles from "../shared/style.module.scss";

const pdfStyles = StyleSheet.create({
  intro: {
    display: "flex",
    flexDirection: "row",
    height: "20%",
    backgroundColor: "#222222",
    fontSize: "10",
    color: "#ffffff",
  },
  profile: {
    flexDirection: "column",
    backgroundColor: "#222222",
    width: "50%",
    margin: "10px",
  },
  profileHeading: {
    marginBottom: "5px",
    fontSize: "15",
  },
  profileParagraph: {
    marginBottom: "10px",
  },
  contact: {
    backgroundColor: "#212121",
    width: "50%",
  },
  hr: {
    height: "3px",
    width: "50%",
    backgroundColor: "#1CAED3",
    margin: "5px 0",
  },
});

const options = {
  renderNode: {
    [BLOCKS.HR]: (): JSX.Element => <View style={pdfStyles.hr} />,
    [BLOCKS.DOCUMENT]: (_: any, children: ReactNode) => {
      return <View>{children}</View>;
    },
    [BLOCKS.HEADING_3]: () => {
      return (
        <View
          style={[pdfStyles.profileHeading, { fontFamily: "Helvetica-Bold" }]}
        >
          <Text>PROFILE</Text>
          <View style={pdfStyles.hr} />
        </View>
      );
    },
    [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => {
      return <View>{children}</View>;
    },
  },
  renderText: (text: string): ReactNode => {
    return <Text style={pdfStyles.profileParagraph}>{text.trim()}</Text>;
  },
};

export class Intro {
  static render(cv: CV): JSX.Element {
    return (
      <View style={pdfStyles.intro}>
        <View style={pdfStyles.profile}>
          {documentToReactComponents(cv.about.entry.about, options)}
        </View>
        <View style={pdfStyles.contact}></View>
      </View>
    );
  }
}
