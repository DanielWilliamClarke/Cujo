import { StyleSheet, Text, View } from '@react-pdf/renderer';

const pdfStyles = StyleSheet.create({
  outro: {
    marginVertical: 5,
  },
});

export const Outro: React.FC = (): JSX.Element => (
  <View style={pdfStyles.outro}>
    <Text>References available on request.</Text>
  </View>
);
