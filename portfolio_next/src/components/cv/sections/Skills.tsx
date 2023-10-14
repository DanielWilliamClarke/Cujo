import React from 'react';
import { StyleSheet, View, Text, Image as PdfImage } from '@react-pdf/renderer';

import { CV as CVModel, Skill } from '../../../model/CVModel';
import { Header } from './Header';
import { Media } from '../../../model/Includes';

const pdfStyles = StyleSheet.create({
  skills: {
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 10,
  },
  skillItem: {
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'row'
  },
  skillIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '100%',
    backgroundColor: '#304c89',
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  }
});

export namespace Skills {
  export const render = (cv: CVModel): JSX.Element => {
    return (
      <View wrap={false} style={pdfStyles.skills}>
        {Header.render('skills')}
        <View>
          <Text style={pdfStyles.paragraph}>
            Below are a collection of my most used skills, please view my
            website linked above for a complete list!
          </Text>
        </View>
        <View style={pdfStyles.skills}>
          {mapSkills(cv.skills.entry.favorite)}
        </View>
      </View>
    );
  };

  const mapSkills = (skills: Skill[]): JSX.Element[] => {
    return skills.map((skill: Skill, index: number) => (
      <View key={index} style={pdfStyles.skillItem}>
        <View style={pdfStyles.skillIcon}>
          {createDevicon(skill.icon.iconImage!)}
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Helvetica-Bold',
              marginTop: '5px',
              marginBottom: '2px',
              fontSize: 10
            }}
          >
            {skill.name.toUpperCase()}
          </Text>
          {createBar(skill.level)}
        </View>
      </View>
    ));
  };

  const createDevicon = (iconImage: Media): JSX.Element => {
    return (
      <PdfImage
        src={iconImage.file.url}
        style={{ width: '10px', height: '10px', marginTop: '5px', zIndex: '999999999' }}
      />
    );
  };

  const createBar = (level: number): JSX.Element => {
    return (
      <View>
        <View
          style={{
            width: 100,
            height: 3,
            backgroundColor: '#999999',
            borderRadius: '100%'
          }}
        >
          <View
            style={{
              width: level,
              height: 3,
              backgroundColor: '#304c89',
              borderRadius: '100%'
            }}
          ></View>
        </View>
      </View>
    );
  };
}
