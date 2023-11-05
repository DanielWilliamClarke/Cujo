import { StyleSheet, Text, View } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  heading: {
    marginVertical: '5px',
    fontSize: '15',
  },
  hr: {
    height: '3px',
    width: '50%',
    backgroundColor: '#304c89',
    margin: '5px 0',
  },
});

type HeaderProps = {
  header: string;
};

export const Header: React.FC<HeaderProps> = ({ header }): JSX.Element => (
  <View style={[pdfStyles.heading, { fontFamily: 'Helvetica-Bold' }]}>
    <Text>{header.toUpperCase()}</Text>
    <View style={pdfStyles.hr} />
  </View>
);
