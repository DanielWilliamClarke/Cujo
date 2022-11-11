import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';

import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { Block } from '@contentful/rich-text-types';

import { CV } from '../../../model/CVModel';
import { Header } from './Header';

export namespace Interests {
  const pdfStyles = StyleSheet.create({
    paragraph: {
      marginBottom: '10px',
      fontSize: 10
    },
    bullet: {
      fontSize: 10,
      marginTop: 5
    }
  });

  export const render = (cv: CV): JSX.Element => {
    return (
      <View>
        {Header.render('interests')}
        {cv.about.entry.interests.content.map((node: Block, index: number) => {
          const line = documentToPlainTextString(node);
          const style = !index ? pdfStyles.paragraph : pdfStyles.bullet;
          return <Text key={index} style={style}>{line.trimStart()}</Text>;
        })}
      </View>
    );
  };
}
