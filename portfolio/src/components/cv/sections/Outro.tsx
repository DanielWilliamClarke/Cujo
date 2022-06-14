import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { CV } from "../../../model/CVModel";
import { Contact } from "./Contact";

const pdfStyles = StyleSheet.create({
  outro: {
    display: "flex",
    flexDirection: "row",
    height: "19%",
    backgroundColor: "#222222",
    fontSize: "10",
    color: "#ffffff",
  },
  references: {
    flexDirection: "column",
    backgroundColor: "#222222",
    width: "70%",
    margin: "15px",
  },
});

export class Outro {
  static render(cv: CV): JSX.Element {
    return (
      <View style={pdfStyles.outro}>
        <View style={pdfStyles.references}>
          <Text>References available on request.</Text>
        </View>
        {Contact.render(cv)}
      </View>
    );
  }
}
