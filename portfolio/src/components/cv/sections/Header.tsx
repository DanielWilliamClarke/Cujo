import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

export namespace Header {
  const pdfStyles = StyleSheet.create({
    heading: {
      marginVertical: "5px",
      fontSize: "15",
    },
    hr: {
      height: "3px",
      width: "50%",
      backgroundColor: "#1CAED3",
      margin: "5px 0",
    },
  });

  export const render = (header: string): JSX.Element => {
    return (
      <View style={[pdfStyles.heading, { fontFamily: "Helvetica-Bold" }]}>
        <Text>{header.toUpperCase()}</Text>
        <View style={pdfStyles.hr} />
      </View>
    );
  }
}
