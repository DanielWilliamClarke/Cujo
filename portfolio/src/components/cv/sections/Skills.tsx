import React from "react";
import { StyleSheet, View, Text, Image } from "@react-pdf/renderer";

import { IDateService } from "../../../services/DateService";

import styles from "../../shared/style.module.scss";
import { CV as CVModel, Skill } from "../../../model/CVModel";

const pdfStyles = StyleSheet.create({
  heading: {
    marginBottom: "5px",
    fontSize: "15",
  },
  paragraph: {
    fontSize: 10,
    marginBottom: "10px",
  },
  hr: {
    height: "3px",
    width: "50%",
    backgroundColor: "#1CAED3",
    margin: "5px 0",
  },
  skillItem: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
  },
  skillIcon: {
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
});

export class Skills {
  static render(cv: CVModel, dateService: IDateService): JSX.Element {
    return (
      <View>
        <View style={[pdfStyles.heading, { fontFamily: "Helvetica-Bold" }]}>
          <Text>SKILLS</Text>
          <View style={pdfStyles.hr} />
        </View>
        <View>
          <Text style={pdfStyles.paragraph}>
            Below are a collection of my most used skills, please view my
            website linked above for a complete list!
          </Text>
        </View>
        {this.mapSkills(cv.skills.entry.favorite)}
      </View>
    );
  }

  private static mapSkills(skills: Skill[]): JSX.Element[] {
    return skills.map((skill: Skill) => (
      <View style={pdfStyles.skillItem}>
        <View style={pdfStyles.skillIcon}>
          {this.createDevicon(skill.icon.icon)}
        </View>
        <View>
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              marginTop: "5px",
              marginBottom: "2px",
              fontSize: 10,
            }}
          >
            {skill.name}
          </Text>
          {this.createBar(skill.level)}
        </View>
      </View>
    ));
  }

  static createDevicon(icon: string): JSX.Element {
    return (
      <Image
        src={require(`../../../assets/icons/${icon}.png`).default}
        style={{ width: "20px", height: "20px", marginTop: "5px" }}
      />
    );
  }

  static createBar(level: number): JSX.Element {
    return (
      <View>
        <View
          style={{
            width: 200,
            height: 5,
            backgroundColor: styles.colorLightBg,
          }}
        >
          <View
            style={{
              width: level * 2,
              height: 5,
              backgroundColor: "#1CAED3",
            }}
          ></View>
        </View>
      </View>
    );
  }
}
