import React from "react";
import { StyleSheet, View, Text, Image } from "@react-pdf/renderer";

import styles from "../../shared/style.module.scss";
import { CV as CVModel, Skill } from "../../../model/CVModel";
import { Header } from "./Header";

const pdfStyles = StyleSheet.create({
  paragraph: {
    fontSize: 10,
    marginBottom: "10px",
  },
  skillItem: {
    marginBottom: "5px",
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
  static render(cv: CVModel): JSX.Element {
    return (
      <View>
        {Header.render("skills")}
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
            {skill.name.toUpperCase()}
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
            borderRadius: "100%",
          }}
        >
          <View
            style={{
              width: level * 2,
              height: 5,
              backgroundColor: "#1CAED3",
              borderRadius: "100%",
            }}
          ></View>
        </View>
      </View>
    );
  }
}
