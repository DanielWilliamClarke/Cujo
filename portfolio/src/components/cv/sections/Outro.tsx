import React from "react";
import { View, StyleSheet, Text, Image } from "@react-pdf/renderer";
import { CV } from "../../../model/CVModel";

import styles from "../../shared/style.module.scss";

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
    width: "70%",
    margin: "15px",
  },
  heading: {
    marginBottom: "5px",
    fontSize: "15",
  },
  paragraph: {
    marginBottom: "20px",
  },
  contact: {
    backgroundColor: "#212121",
    width: "30%",
    margin: "15px",
  },
  contactIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "100%",
    backgroundColor: "#1CAED3",
    marginRight: "10px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  contactItem: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
  },
  contactValue: {
    color: styles.colorMuted,
  },
  hr: {
    height: "3px",
    width: "50%",
    backgroundColor: "#1CAED3",
    margin: "5px 0",
  },
});

export class Outro {
  static render(cv: CV): JSX.Element {
    return (
      <View style={pdfStyles.intro}>
        <View style={pdfStyles.profile}>
          <Text>References avalable on request.</Text>
        </View>
        <View style={pdfStyles.contact}>
          {/* <View style={[pdfStyles.heading, { fontFamily: "Helvetica-Bold" }]}>
            <Text>CONTACT</Text>
            <View style={pdfStyles.hr} />
          </View> */}
          {this.createContactItem(
            "Phone",
            cv.about.entry.phone,
            "phone_in_talk"
          )}
          {this.createContactItem("Email", cv.about.entry.email, "email")}
          {this.createContactItem("Website", cv.about.entry.website, "link")}
          {this.createContactItem(
            "Address",
            "Crawley, UK".toUpperCase(),
            "house"
          )}
        </View>
      </View>
    );
  }

  private static createContactItem(
    title: string,
    value: string,
    iconName: string
  ): JSX.Element {
    return (
      <View style={pdfStyles.contactItem}>
        <View style={pdfStyles.contactIcon}>
          <Image
            src={`https://material-icons.github.io/material-icons-png/png/white/${iconName}/round-4x.png`}
            style={{ width: "15px", height: "15px", marginTop: "8px" }}
          />
        </View>
        <View>
          <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: "8px" }}>
            {title.toUpperCase()}
          </Text>
          <Text style={pdfStyles.contactValue}>{value}</Text>
        </View>
      </View>
    );
  }
}
