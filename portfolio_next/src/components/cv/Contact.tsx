import { Image as PdfImage, StyleSheet, Text, View } from '@react-pdf/renderer';

import { useAppContext } from '../hooks/AppContext';
import { Header } from './Header';

const pdfStyles = StyleSheet.create({
  contact: {
    marginVertical: 7,
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

const createIconUrl = (iconName: string) =>
  `https://material-icons.github.io/material-icons-png/png/white/${iconName}/round-4x.png`;

type ContactItemProps = {
  title: string;
  value: string;
  iconUrl: string;
};

const ContactItem: React.FC<ContactItemProps> = ({
  title,
  value,
  iconUrl,
}): JSX.Element => {
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

type ContactProps = {
  withHeader?: boolean;
};

export const Contact: React.FC<ContactProps> = ({
  withHeader = false,
}): JSX.Element => {
  const { cv } = useAppContext();

  const githubProfile = cv.about.entry.profiles.find(
    ({ brand }) => brand.name === 'Github',
  );

  return (
    <View wrap={false} style={pdfStyles.contact}>
      {withHeader && <Header header="contact" />}
      <ContactItem
        title="Phone"
        value={cv.about.entry.phone}
        iconUrl={createIconUrl('phone_in_talk')}
      />
      <ContactItem
        title="Email"
        value={cv.about.entry.email}
        iconUrl={createIconUrl('email')}
      />
      <ContactItem
        title="Website"
        value={cv.about.entry.website}
        iconUrl={createIconUrl('link')}
      />
      {githubProfile && (
        <ContactItem
          title="Github"
          value={githubProfile.url}
          iconUrl={
            githubProfile.brand.iconImage?.file.url ?? createIconUrl('link')
          }
        />
      )}
      <ContactItem
        title="Address"
        value={'Crawley, UK'.toUpperCase()}
        iconUrl={createIconUrl('house')}
      />
    </View>
  );
};
