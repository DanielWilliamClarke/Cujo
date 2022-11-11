import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import { CV } from '../../../model/CVModel';

import styles from '../../shared/style.module.scss';
import { Header } from './Header';

export namespace Contact {
  const pdfStyles = StyleSheet.create({
    contact: {
      backgroundColor: '#212121',
      width: '30%',
      margin: '15px'
    },
    contactIcon: {
      width: '30px',
      height: '30px',
      borderRadius: '100%',
      backgroundColor: '#1CAED3',
      marginRight: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row'
    },
    contactItem: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'row'
    },
    contactValue: {
      color: styles.colorMuted
    }
  });

  export const render = (cv: CV, withHeader?: boolean): JSX.Element => {
    return (
      <View style={pdfStyles.contact}>
        {withHeader && Header.render('contact')}
        {createContactItem('Phone', cv.about.entry.phone, 'phone_in_talk')}
        {createContactItem('Email', cv.about.entry.email, 'email')}
        {createContactItem('Website', cv.about.entry.website, 'link')}
        {createContactItem(
          'Address',
          'Crawley, UK'.toUpperCase(),
          'house'
        )}
      </View>
    );
  };

  const createContactItem = (
    title: string,
    value: string,
    iconName: string
  ): JSX.Element => {
    return (
      <View style={pdfStyles.contactItem}>
        <View style={pdfStyles.contactIcon}>
          <Image
            src={`https://material-icons.github.io/material-icons-png/png/white/${iconName}/round-4x.png`}
            style={{ width: '15px', height: '15px', marginTop: '8px' }}
          />
        </View>
        <View>
          <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: '8px' }}>
            {title.toUpperCase()}
          </Text>
          <Text style={pdfStyles.contactValue}>{value}</Text>
        </View>
      </View>
    );
  };
}
