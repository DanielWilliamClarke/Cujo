import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Image as PdfImage, StyleSheet, Text, View } from '@react-pdf/renderer';
import { useInjection } from 'inversify-react';
import { ReactNode } from 'react';

import { Work } from '@Models/CVModel';

import { IDateService } from '@Services/DateService';

import { useAppContext } from '../hooks/AppContext';
import { Header } from './Header';

const pdfStyles = StyleSheet.create({
  experience: {
    fontSize: 10,
    marginVertical: 8,
  },
  company: {
    fontSize: 10,
  },
  role: {
    fontSize: 11,
  },
  dates: {
    color: '#999999',
  },
  lanyard: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
  },
  pill: {
    backgroundColor: '#304c89',
    borderRadius: '100%',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 3,
    marginVertical: 3,
    color: '#ffffff',
  },
  experienceItem: {
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'row',
  },
  experienceIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '100%',
    marginRight: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
});

const options = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (_: any, children: ReactNode) => <View>{children}</View>,
    [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => (
      <View>{children}</View>
    ),
    [BLOCKS.LIST_ITEM]: (_: any, children: ReactNode) => (
      <View style={{ flexDirection: 'row', marginVertical: 4 }}>
        <Text style={{ marginHorizontal: 8, color: '#304c89' }}>•</Text>
        <Text style={{ width: '95%' }}>{children}</Text>
      </View>
    ),
  },
  renderText: (text: string): ReactNode => <Text>{text.trim()}</Text>,
};

type LanyardProps = {
  tags: string[];
};

const Lanyard: React.FC<LanyardProps> = ({ tags }): JSX.Element => (
  <View style={pdfStyles.lanyard}>
    {tags.map((tag, index: number) => (
      <View key={index} style={pdfStyles.pill}>
        <Text>{tag}</Text>
      </View>
    ))}
  </View>
);

export const Experience: React.FC = (): JSX.Element => {
  const {
    cv: { work },
  } = useAppContext();

  const dateService = useInjection(IDateService.$);
  dateService.format('Do MMMM YYYY HH:mm');

  const experience = work.entries
    .filter(
      ({ startDate, hideFromCv }: Work) =>
        !hideFromCv && !dateService.IsFuture(startDate.toString()),
    )
    .sort(
      (a: Work, b: Work) =>
        dateService.toUnix(b.startDate.toString()) -
        dateService.toUnix(a.startDate.toString()),
    );

  return (
    <View>
      <Header header="experience" />
      <View>
        {experience.map((work: Work, index: number) => (
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
                    work.endDate?.toString() ?? 'Present',
                  )}
                </Text>
                <Text
                  style={[pdfStyles.company, { fontFamily: 'Helvetica-Bold' }]}
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
            <Lanyard tags={work.highlights} />
            {documentToReactComponents(work.summary, options)}
          </View>
        ))}
      </View>
    </View>
  );
};
