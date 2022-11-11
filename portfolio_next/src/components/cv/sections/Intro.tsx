import React, { ReactNode } from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { Header } from './Header';
import { Contact } from './Contact';

import { CV } from '../../../model/CVModel';

export namespace Intro {
  const pdfStyles = StyleSheet.create({
    intro: {
      display: 'flex',
      flexDirection: 'row',
      height: '25%',
      backgroundColor: '#222222',
      fontSize: '10',
      color: '#ffffff'
    },
    profile: {
      flexDirection: 'column',
      backgroundColor: '#222222',
      width: '70%',
      margin: '15px'
    },
    paragraph: {
      marginBottom: '20px'
    }
  });

  const options = {
    renderNode: {
      [BLOCKS.DOCUMENT]: (_: any, children: ReactNode) => <View>{children}</View>,
      [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => <View>{children}</View>
    },
    renderText: (text: string): ReactNode => (
      <Text style={pdfStyles.paragraph}>{text.trim()}</Text>
    )
  };

  export const render = (cv: CV): JSX.Element => {
    return (
      <View style={pdfStyles.intro}>
        <View style={pdfStyles.profile}>
          {Header.render('profile')}
          {documentToReactComponents(cv.about.entry.about, options)}
        </View>
        {Contact.render(cv, true)}
      </View>
    );
  };
}
