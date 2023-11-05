import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';

import { useAppContext } from '../hooks/AppContext';
import { Header } from './Header';

const pdfStyles = StyleSheet.create({
  intro: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
  },
  profile: {
    flexDirection: 'column',
  },
  paragraph: {
    marginBottom: '5px',
  },
});

const options = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (_: any, children: ReactNode) => <View>{children}</View>,
    [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => (
      <View>{children}</View>
    ),
  },
  renderText: (text: string): ReactNode => (
    <Text style={pdfStyles.paragraph}>{text.trim()}</Text>
  ),
};

export const Intro: React.FC = (): JSX.Element => {
  const { cv } = useAppContext();

  return (
    <View style={pdfStyles.intro}>
      <View style={pdfStyles.profile}>
        <Header header="Mission" />
        {/* Only show first paragraph */}
        {documentToReactComponents(
          cv.about.entry.about.content[0] as any,
          options,
        )}
      </View>
    </View>
  );
};
