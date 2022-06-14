import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

import { Block } from "@contentful/rich-text-types";

import { CV } from "../../../model/CVModel";
import { Header } from "./Header";

const pdfStyles = StyleSheet.create({
  paragraph: {
    marginBottom: "10px",
    fontSize: 10,
  },
  bullet: {
    fontSize: 10,
    marginTop: 5,
  },
});

export class Interests {
  static render(cv: CV): JSX.Element {
    return (
      <View>
        {cv.about.entry.interests.content.map((node: Block, index: number) => {
          const line = documentToPlainTextString(node);
          if (!index) {
            return Header.render(line);
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
