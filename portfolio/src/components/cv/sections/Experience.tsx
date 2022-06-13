import React from "react";
import { View, StyleSheet, Text, Image } from "@react-pdf/renderer";

import { DateService, IDateService } from "../../../services/DateService";
import { Work } from "../../../model/CVModel";

import styles from "../../shared/style.module.scss";

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
  experience: {
    fontSize: 10,
    marginBottom: 15,
  },
  company: {
    fontSize: 10,
  },
  role: {
    fontSize: 11,
  },
  dates: {
    color: styles.colorMuted,
  },
  lanyard: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
  },
  pill: {
    backgroundColor: "#1CAED3",
    borderRadius: "100%",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 3,
    marginVertical: 3,
    color: "#ffffff",
  },
  experienceItem: {
    marginBottom: "5px",
    display: "flex",
    flexDirection: "row",
  },
  experienceIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "100%",
    marginRight: "10px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
});

export class Experience {
  private static dateService: IDateService = (() => {
    const service = new DateService();
    service.format("MMMM YYYY", "YYYY-MM-DD");
    return service;
  })();

  static render(work: Work[]): JSX.Element {
    return (
      <View>
        <View style={[pdfStyles.heading, { fontFamily: "Helvetica-Bold" }]}>
          <Text>EXPERIENCE</Text>
          <View style={pdfStyles.hr} />
        </View>
        <View>
          {work
            .filter(
              ({ startDate }: Work) =>
                !this.dateService.IsFuture(startDate.toString())
            )
            .sort(
              (a: Work, b: Work) =>
                this.dateService.toUnix(b.startDate.toString()) -
                this.dateService.toUnix(a.startDate.toString())
            )
            .map((work: Work) => (
              <View style={pdfStyles.experience}>
                <View style={pdfStyles.experienceItem}>
                  <Image
                    src={work.images[0].file.url}
                    style={pdfStyles.experienceIcon}
                  />
                  <View>
                    <Text style={pdfStyles.dates}>
                      {this.dateService.toRangeWithDuration(
                        work.startDate.toString(),
                        work.endDate?.toString() ?? "Present"
                      )}
                    </Text>
                    <Text
                      style={[
                        pdfStyles.company,
                        { fontFamily: "Helvetica-Bold" },
                      ]}
                    >
                      {work.company}
                    </Text>
                    <Text
                      style={[pdfStyles.role, { fontFamily: "Helvetica-Bold" }]}
                    >
                      {work.position}
                    </Text>
                  </View>
                </View>
                {this.createLanyard(work.highlights)}
                <Text>{work.summary}</Text>
              </View>
            ))}
        </View>
      </View>
    );
  }

  private static createLanyard(tags: string[]): JSX.Element {
    return (
      <View style={pdfStyles.lanyard}>
        {tags.map((tag) => (
          <View style={pdfStyles.pill}>
            <Text>{tag}</Text>
          </View>
        ))}
      </View>
    );
  }
}
