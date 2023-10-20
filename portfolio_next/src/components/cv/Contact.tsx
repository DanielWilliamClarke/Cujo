import { CV } from '@Models/CVModel';
import { Image as PdfImage, StyleSheet, Text, View } from '@react-pdf/renderer';

import { Header } from './Header';

export namespace Contact {
  const pdfStyles = StyleSheet.create({
    contact: {
      marginVertical: 10,
      fontSize: '10',
    },
    contactIcon: {
      width: '20px',
      height: '20px',
      borderRadius: '100%',
      backgroundColor: '#304c89',
      marginRight: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row',
    },
    contactItem: {
      marginBottom: '5px',
      display: 'flex',
      flexDirection: 'row',
    },
    contactValue: {
      color: '#999999',
    },
  });

  export const render = (cv: CV, withHeader?: boolean): JSX.Element => {
    const githubProfile = cv.about.entry.profiles.find(
      ({ brand }) => brand.name === 'Github',
    );

    return (
      <View wrap={false} style={pdfStyles.contact}>
        {withHeader && Header.render('contact')}
        {createContactItem(
          'Phone',
          cv.about.entry.phone,
          createIconUrl('phone_in_talk'),
        )}
        {createContactItem(
          'Email',
          cv.about.entry.email,
          createIconUrl('email'),
        )}
        {createContactItem(
          'Website',
          cv.about.entry.website,
          createIconUrl('link'),
        )}
        {githubProfile &&
          createContactItem(
            'Github',
            githubProfile.url,
            githubProfile.brand.iconImage?.file.url ?? createIconUrl('link'),
          )}
        {createContactItem(
          'Address',
          'Crawley, UK'.toUpperCase(),
          createIconUrl('house'),
        )}
      </View>
    );
  };

  const createIconUrl = (iconName: string) =>
    `https://material-icons.github.io/material-icons-png/png/white/${iconName}/round-4x.png`;

  const createContactItem = (
    title: string,
    value: string,
    iconUrl: string,
  ): JSX.Element => {
    return (
      <View style={pdfStyles.contactItem}>
        <View style={pdfStyles.contactIcon}>
          <PdfImage
            src={iconUrl}
            style={{ width: '10px', height: '10px', marginTop: '5px' }}
          />
        </View>
        <View wrap>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>
            {title.toUpperCase()}
          </Text>
          <Text style={pdfStyles.contactValue}>{value}</Text>
        </View>
      </View>
    );
  };
}
