import React, { ReactNode } from 'react';
import { View, StyleSheet, Text, Image as PdfImage } from '@react-pdf/renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

import { DateService, IDateService } from '../../../services/DateService';
import { Work } from '../../../model/CVModel';

import styles from '../../shared/style.module.scss';
import { Header } from './Header';

export namespace Experience {
  const pdfStyles = StyleSheet.create({
    experience: {
      fontSize: 10,
      marginVertical: 5,
    },
    company: {
      fontSize: 10
    },
    role: {
      fontSize: 11
    },
    dates: {
      color: styles.colorMuted
    },
    lanyard: {
      display: 'flex',
      flexDirection: 'row',
      marginVertical: 5
    },
    pill: {
      backgroundColor: '#304c89',
      borderRadius: '100%',
      paddingHorizontal: 5,
      paddingVertical: 2,
      marginRight: 3,
      marginVertical: 3,
      color: '#ffffff'
    },
    experienceItem: {
      marginBottom: '5px',
      display: 'flex',
      flexDirection: 'row'
    },
    experienceIcon: {
      width: '30px',
      height: '30px',
      borderRadius: '100%',
      marginRight: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      flexDirection: 'row'
    }
  });

  const options = {
    renderNode: {
      [BLOCKS.DOCUMENT]: (_: any, children: ReactNode) => <View>{children}</View>,
      [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => (
        <View>{children}</View>
      ),
      [BLOCKS.LIST_ITEM]: (_: any, children: ReactNode) => (
        <View style={{ flexDirection: "row", marginVertical: 4 }}>
          <Text style={{ marginHorizontal: 8, color: '#304c89' }}>•</Text>
          <Text style={{ width: '95%' }}>{children}</Text>
        </View>
      )
    },
    renderText: (text: string): ReactNode => (
      <Text>{text.trim()}</Text>
    )
  };

  const dateService: IDateService = (() => {
    const service = new DateService();
    service.format('MMMM YYYY', 'YYYY-MM-DD');
    return service;
  })();

  export const render = (work: Work[], withContinue: boolean = false): JSX.Element => {
    return (
      <View>
        {Header.render(`experience ${withContinue ? '(cont)' : ''}`)}
        <View>
          {work.map((work: Work, index: number) => (
            <View wrap={false} key={index} style={pdfStyles.experience}>
              <View style={pdfStyles.experienceItem}>
                <PdfImage
                  src={work.images[0].file.url}
                  style={pdfStyles.experienceIcon}
                />
                <View>
                  <Text style={pdfStyles.dates}>
                    {dateService.toRangeWithDuration(
                      work.startDate.toString(),
                      work.endDate?.toString() ?? 'Present'
                    )}
                  </Text>
                  <Text
                    style={[
                      pdfStyles.company,
                      { fontFamily: 'Helvetica-Bold' }
                    ]}
                  >
                    {work.company}
                  </Text>
                  <Text
                    style={[pdfStyles.role, { fontFamily: 'Helvetica-Bold' }]}
                  >
                    {work.position}
                  </Text>
                </View>
              </View>
              {createLanyard(work.highlights)}
              {documentToReactComponents(work.summary, options)}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const createLanyard = (tags: string[]): JSX.Element => {
    return (
      <View style={pdfStyles.lanyard}>
        {tags.map((tag, index: number) => (
          <View key={index} style={pdfStyles.pill}>
            <Text>{tag}</Text>
          </View>
        ))}
      </View>
    );
  };
}
