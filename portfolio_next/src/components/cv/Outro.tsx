import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { CV } from '@Models/CVModel';

export namespace Outro {
  const pdfStyles = StyleSheet.create({
    outro: {
      marginVertical: 5,
    },
  });

  export const render = (cv: CV): JSX.Element => {
    return (
      <View style={pdfStyles.outro}>
        <Text>References available on request.</Text>
      </View>
    );
  };
}
