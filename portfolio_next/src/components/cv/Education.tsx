import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
2
import { DateService, IDateService } from '@Services/DateService';
import { CV, Education as EducationModel } from '@Models/CVModel';

import { Header } from './Header';

export namespace Education {
  const pdfStyles = StyleSheet.create({
    education: {
      fontSize: 10,
      marginVertical: 10,
    },
    institution: {
      fontSize: 12
    },
    dates: {
      color: '#999999'
    }
  });

  const dateService: IDateService = (() => {
    const service = new DateService();
    service.format('MMMM YYYY', 'YYYY-MM-DD');
    return service;
  })();

  export const render = (cv: CV): JSX.Element => {
    return (
      <View wrap={false}>
        {Header.render('education')}
        <View>
          {cv.education.entries
            .sort(
              (a, b) =>
                dateService.toUnix(b.startDate.toString()) -
                dateService.toUnix(a.startDate.toString())
            )
            .map((education: EducationModel, index: number) => (
              <View key={index} style={pdfStyles.education}>
                <Text style={pdfStyles.dates}>
                  {dateService.toRange(
                    education.startDate.toString(),
                    education.endDate.toString()
                  )}
                </Text>
                <Text
                  style={[
                    pdfStyles.institution,
                    { fontFamily: 'Helvetica-Bold' }
                  ]}
                >
                  {education.area}{' '}
                  {education.grade ? `| ${education.grade}` : ''}
                </Text>
                <Text>{education.institution}</Text>
              </View>
            ))}
        </View>
      </View>
    );
  };
}
