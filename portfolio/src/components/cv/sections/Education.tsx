import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";

import { DateService, IDateService } from "../../../services/DateService";
import { CV, Education as EducationModel } from "../../../model/CVModel";

import styles from "../../shared/style.module.scss";

const pdfStyles = StyleSheet.create({
  heading: {
    marginVertical: "5px",
    fontSize: "15",
  },
  paragraph: {
    marginBottom: "20px",
  },
  hr: {
    height: "3px",
    width: "50%",
    backgroundColor: "#1CAED3",
    margin: "5px 0",
  },
  education: {
    fontSize: 10,
    marginBottom: 10,
  },
  institution: {
    fontSize: 12,
  },
  dates: {
    color: styles.colorMuted,
  },
});

export class Education {
  private static dateService: IDateService = (() => {
    const service = new DateService();
    service.format("MMMM YYYY", "YYYY-MM-DD");
    return service;
  })();

  static render(cv: CV): JSX.Element {
    return (
      <View>
        <View style={[pdfStyles.heading, { fontFamily: "Helvetica-Bold" }]}>
          <Text>EDUCATION</Text>
          <View style={pdfStyles.hr} />
        </View>
        <View>
          {cv.education.entries
            .sort(
              (a, b) =>
                this.dateService.toUnix(b.startDate.toString()) -
                this.dateService.toUnix(a.startDate.toString())
            )
            .map((education: EducationModel) => (
              <View style={pdfStyles.education}>
                <Text style={pdfStyles.dates}>
                  {this.dateService.toRange(
                    education.startDate.toString(),
                    education.endDate.toString()
                  )}
                </Text>
                <Text
                  style={[
                    pdfStyles.institution,
                    { fontFamily: "Helvetica-Bold" },
                  ]}
                >
                  {education.area}{" "}
                  {education.grade ? `| ${education.grade}` : ""}
                </Text>
                <Text>{education.institution}</Text>
              </View>
            ))}
        </View>
      </View>
    );
  }
}
