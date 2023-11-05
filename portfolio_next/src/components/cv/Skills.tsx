import { Image as PdfImage, StyleSheet, Text, View } from '@react-pdf/renderer';

import { Skill } from '@Models/CVModel';
import { Media } from '@Models/Includes';

import { useAppContext } from '@Hooks/AppContext';

import { Header } from './Header';

const pdfStyles = StyleSheet.create({
  skills: {
    marginVertical: 8,
  },
  paragraph: {
    fontSize: 10,
  },
  skillItem: {
    marginBottom: '5px',
    display: 'flex',
    flexDirection: 'row',
  },
  skillIcon: {
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
});

export const Skills: React.FC = (): JSX.Element => {
  const { cv } = useAppContext();

  return (
    <View wrap={false} style={pdfStyles.skills}>
      <Header header="skills" />
      <View>
        <Text style={pdfStyles.paragraph}>
          Below are a collection of my most used skills, please view my website
          linked above for a complete list!
        </Text>
      </View>
      <View style={pdfStyles.skills}>
        {cv.skills.entry.favorite.map((skill: Skill, index: number) => (
          <View key={index} style={pdfStyles.skillItem}>
            <View style={pdfStyles.skillIcon}>
              <DevIcon iconImage={skill.icon.iconImage!} />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  marginTop: '5px',
                  marginBottom: '2px',
                  fontSize: 10,
                }}
              >
                {skill.name.toUpperCase()}
              </Text>
              <Bar level={skill.level} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

type DevIconProps = {
  iconImage: Media;
};

const DevIcon: React.FC<DevIconProps> = ({ iconImage }): JSX.Element => (
  <PdfImage
    src={iconImage.file.url}
    style={{
      width: '10px',
      height: '10px',
      marginTop: '5px',
      zIndex: '999999999',
    }}
  />
);

type BarProps = {
  level: number;
};

const Bar: React.FC<BarProps> = ({ level }): JSX.Element => (
  <View>
    <View
      style={{
        width: 100,
        height: 3,
        backgroundColor: '#999999',
        borderRadius: '100%',
      }}
    >
      <View
        style={{
          width: level,
          height: 3,
          backgroundColor: '#304c89',
          borderRadius: '100%',
        }}
      ></View>
    </View>
  </View>
);
