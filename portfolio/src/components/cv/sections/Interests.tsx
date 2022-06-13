import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import { Block } from "@contentful/rich-text-types";

import { CV } from "../../../model/CVModel";

const pdfStyles = StyleSheet.create({
  heading: {
    marginBottom: "5px",
    fontSize: "15",
  },
  paragraph: {
    marginBottom: "10px",
    fontSize: 10,
  },
  bullet: {
    fontSize: 10,
    marginTop: 5,
  },
  hr: {
    height: "3px",
    width: "50%",
    backgroundColor: "#1CAED3",
    margin: "5px 0",
  },
  thinHr: {
    height: "1px",
    width: "25%",
    backgroundColor: "#1CAED3",
    margin: "5px 0",
  },
});

export class Interests {
  static render(cv: CV): JSX.Element {
    return (
      <View>
        {cv.about.entry.interests.content.map((node: Block, index: number) => {
          const line = documentToPlainTextString(node);
          if (!index) {
            return (
              <View
                style={[pdfStyles.heading, { fontFamily: "Helvetica-Bold" }]}
              >
                <Text>{line.toUpperCase()}</Text>
                <View style={pdfStyles.hr} />
              </View>
            );
          }
          if (index === 1) {
            return <Text style={pdfStyles.paragraph}>{line.trimStart()}</Text>;
          }
          return <Text style={pdfStyles.bullet}>{line.trimStart()}</Text>;
        })}
      </View>
    );
  }
}
