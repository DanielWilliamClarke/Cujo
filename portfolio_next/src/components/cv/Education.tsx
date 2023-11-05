import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { useInjection } from 'inversify-react';

import { Education as EducationModel } from '@Models/CVModel';

import { IDateService } from '@Services/DateService';

import { useAppContext } from '../hooks/AppContext';
import { Header } from './Header';

const pdfStyles = StyleSheet.create({
  education: {
    fontSize: 10,
    marginVertical: 10,
  },
  institution: {
    fontSize: 12,
  },
  dates: {
    color: '#999999',
  },
});

export const Education: React.FC = (): JSX.Element => {
  const { cv } = useAppContext();

  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm');

  return (
    <View wrap={false}>
      <Header header="education" />
      <View>
        {cv.education.entries
          .sort(
            (a, b) =>
              dateService.toUnix(b.startDate.toString()) -
              dateService.toUnix(a.startDate.toString()),
          )
          .map((education: EducationModel, index: number) => (
            <View key={index} style={pdfStyles.education}>
              <Text style={pdfStyles.dates}>
                {dateService.toRange(
                  education.startDate.toString(),
                  education.endDate.toString(),
                )}
              </Text>
              <Text
                style={[
                  pdfStyles.institution,
                  { fontFamily: 'Helvetica-Bold' },
                ]}
              >
                {education.area} {education.grade ? `| ${education.grade}` : ''}
              </Text>
              <Text>{education.institution}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};
