/** @jsxImportSource theme-ui */
import { alpha } from '@theme-ui/color';
import { useInjection } from 'inversify-react';
import p5 from 'p5';
import React, { useEffect, useMemo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Theme } from 'theme-ui';

import { Work } from '@Models/CVModel';

import { IDateService } from '@Services/DateService';

import { getSketch } from '@Sketches/index';

import { DynamicImage } from '@Common/DynamicImage';
import { anton } from '@Common/Font';
import { Logo } from '@Common/Logo';
import { ScrollIndicator } from '@Common/ScrollIndicator';
import { centeredStyle } from '@Common/UtilComponents';

import { useAppContext } from '../hooks/AppContext';

// This stops any re-renders from creating multiple canvas'
let rendered = false;

const SketchBackstretch: React.FC = React.memo((): JSX.Element => {
  const { cv } = useAppContext();

  const dateService = useInjection(IDateService.$);
  dateService.format('MMMM YYYY', 'YYYY-MM-DD');

  const currentRole = useMemo(() => {
    return cv.work.entries
      .filter(
        ({ startDate }: Work) => !dateService.IsFuture(startDate.toString()),
      )
      .sort(
        (a, b) =>
          dateService.toUnix(b.startDate.toString()) -
          dateService.toUnix(a.startDate.toString()),
      )[0];
  }, [cv.work.entries, dateService]);

  // Similar to componentDidMount and componentDidUpdate:
  const p5Ref = useMemo(() => React.createRef<any>(), []);
  useEffect(() => {
    if (!rendered) {
      new p5(getSketch(cv, currentRole), p5Ref.current);
      rendered = true;
    }
  });

  return useMemo(
    () => (
      <section id="home">
        <Container
          fluid
          ref={p5Ref}
          sx={(t: Theme) => ({
            height: '100vh',
            marginBottom: -70,
            padding: 0,
            background: `linear-gradient(0deg,
               ${alpha('backGradSketchHigh', 0.6)(t)},
               ${alpha('backGradSketchLow', 0)(t)})`,
            opacity: 0.6,

            canvas: {
              position: 'absolute',
              zIndex: -1,
            },
          })}
        />
        <Container
          fluid
          className={anton.className}
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            color: 'backStretchText',
            position: 'absolute',
            top: 0,
            userSelect: 'none',
            flexDirection: ['column', 'row', 'row'],
            transition: '0.5s',
            marginBottom: -70,
          }}
        >
          <Logo
            sx={{
              paddingRight: [0, 30, 30],
            }}
          />
          <div>
            <Row
              sx={{
                fontSize: 'calc(30px + 3vw)',
                lineHeight: 'calc(30px + 3vw)',
                fontWeight: 700,
                textShadow: '0 0 50px shadow',
                paddingBottom: [20, 0, 0],

                '@media screen and (max-width: 700px)': {
                  fontSize: 50,
                  lineHeight: 'calc(40px + 3vw)',
                },
              }}
            >
              <Col>{cv.about.entry.name.toLocaleUpperCase()}</Col>
            </Row>
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: ['column', 'row', 'row'],
              }}
            >
              <Row
                sx={{
                  fontSize: 'calc(15px + 1vw)',
                  lineHeight: 'calc(15px + 1vw)',
                  fontWeight: 400,
                  textShadow: '0 0 50px shadow',
                }}
              >
                <Col>{cv.about.entry.label.toLocaleUpperCase()}</Col>
              </Row>
              <Row
                sx={{
                  paddingLeft: 12,
                  height: 20,
                }}
              >
                <Col>
                  <DynamicImage
                    image={currentRole.logo}
                    sx={{
                      ...centeredStyle,
                      height: 20,
                      paddingTop: [10, 0, 0],
                    }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Container>
        <Container
          fluid
          sx={{
            justifyContent: 'center',
            display: ['none', 'flex', 'flex'],
          }}
        >
          <ScrollIndicator
            sx={{
              bottom: '28%',
            }}
          />
        </Container>
      </section>
    ),
    [p5Ref, cv.about.entry, currentRole],
  );
});

SketchBackstretch.displayName = 'SketchBackstretch';

export default SketchBackstretch;
