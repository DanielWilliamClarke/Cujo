import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import { IDateService } from "../../../services/DateService";

import styles from "../../shared/style.module.scss";
import { CV, Work } from "../../../model/CVModel";

export namespace Heading {
  const pdfStyles = StyleSheet.create({
    body: {
      fontFamily: "Helvetica",
    },
    header: {
      backgroundColor: "#1CAED3",
      width: "100%",
      height: "15%",
      textAlign: "center",
    },
    heading: {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "row",
      width: "100%",
      marginTop: "5.5%",
      fontFamily: "Helvetica-Bold",
    },
    name: {
      margin: "2px",
      fontSize: "40",
      fontWeight: "heavy",
      color: "#1f242c",
    },
    headline: {
      justifyContent: "center",
      alignContent: "center",
      flexDirection: "row",
    },
    role: {
      color: "#ffffff",
      fontSize: "15",
    },
  });
  

  export const render = (cv: CV, dateService: IDateService): JSX.Element => {
    const colors = [styles.colorLightBg, styles.colorLightBg, "#ffffff"];
    const nameParts = cv.about.entry.name
      .split(" ")
      .map((name: string, index: number) => ({ name, color: colors[index] }));

    const currentRole = cv.work.entries
      .filter(
        ({ startDate }: Work) => !dateService.IsFuture(startDate.toString())
      )
      .sort(
        (a, b) =>
          dateService.toUnix(b.startDate.toString()) -
          dateService.toUnix(a.startDate.toString())
      )[0];

    return (
      <View style={pdfStyles.header}>
        <View style={pdfStyles.heading}>
          <View style={{ flexDirection: "row", textAlign: "center" }}>
            {nameParts.map(({ name, color }) => (
              <Text style={[pdfStyles.name, { color }]}>
                {name.toUpperCase()}
              </Text>
            ))}
          </View>
        </View>
        <View style={pdfStyles.headline}>
          <Text style={[pdfStyles.role, { fontFamily: "Helvetica-Bold" }]}>
            {`${currentRole.position}`.toUpperCase()}
          </Text>
          <Text style={pdfStyles.role}>{` | `}</Text>
          <Text style={[pdfStyles.role, { fontFamily: "Helvetica-Bold" }]}>
            {`${currentRole.company}`.toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
}
