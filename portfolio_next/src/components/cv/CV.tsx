import { Document, Font, Page, StyleSheet, View } from '@react-pdf/renderer';

import { Contact } from './Contact';
import { Education } from './Education';
import { Experience } from './Experience';
import { Heading } from './Heading';
import { Interests } from './Interests';
import { Intro } from './Intro';
import { Outro } from './Outro';
import { Skills } from './Skills';

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

Font.registerHyphenationCallback((word) => [word]);

const pdfStyles = StyleSheet.create({
  body: {
    fontFamily: 'Helvetica',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
  },
  left: {
    backgroundColor: '#222222',
    fontSize: '10',
    color: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15,
    width: '30%',
  },
  right: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 7,
    width: '70%',
    backgroundColor: '#fdfdfd',
  },
  outro: {
    marginHorizontal: 15,
    position: 'absolute',
    bottom: 0,
  },
});

export const CV = (): JSX.Element => (
  <Document>
    <Page style={pdfStyles.body} size="A4">
      <Heading />
      <View style={pdfStyles.contentRow}>
        <View style={pdfStyles.left}>
          <Contact withHeader />
          <Skills />
          <Education />
          <Interests />
          <View style={pdfStyles.outro}>
            <Outro />
            <Contact />
          </View>
        </View>
        <View style={pdfStyles.right}>
          <Intro />
          <Experience />
        </View>
      </View>
    </Page>
  </Document>
);
