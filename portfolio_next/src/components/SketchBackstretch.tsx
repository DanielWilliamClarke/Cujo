/** @jsxImportSource theme-ui */

import p5 from 'p5';
import React, { useEffect, useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useInjection } from 'inversify-react';
import { IDateService } from '../services/DateService';
import { getSketch } from '../sketches';
import { CVProps, Work } from '../model/CVModel';

import { ScrollIndicator } from './ScrollIndicator';
import { DynamicImage } from './DynamicImage';
import { Logo } from './Logo';
import { anton } from './Font';
import { Theme } from 'theme-ui';
import { alpha } from '@theme-ui/color';
import { centeredStyle } from './UtilComponents';

// This stops any re-renders from creating multiple canvas'
let rendered = false;

const SketchBackstretch: React.FC<CVProps> = React.memo(({ cv }: CVProps): JSX.Element => {
  const dateService = useInjection(IDateService.$);
  dateService.format('MMMM YYYY', 'YYYY-MM-DD');

  const currentRole = useMemo(() => {
    return cv.work.entries
      .filter(
        ({ startDate }: Work) =>
          !dateService.IsFuture(startDate.toString())
      )
      .sort(
        (a, b) =>
          dateService.toUnix(b.startDate.toString()) -
          dateService.toUnix(a.startDate.toString())
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

  return useMemo(() => (
    <section id="home">
      <Container
        className={anton.className}
        fluid
        ref={p5Ref}
        sx={(t: Theme) => ({
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'text',
          height: '100vh',
          textAlign: 'center',
          transition: '0.5s',
          marginBottom: -70,
          background: `linear-gradient(0deg,
               ${alpha('backGradSketchHigh', 0.6)(t)},
               ${alpha('backGradSketchLow', 0)(t)})`,
          opacity: 0.6,

          'canvas': {
            position: 'absolute',
            zIndex: -1
          }
        })}
      >
        <div
          sx={{
            userSelect: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: ['column', 'row', 'row']
          }}
        >
          <Logo
            sx={{
              paddingRight: [0, 30, 30]
            }}
          />
          <div>
            <Row
              sx={{
                fontSize: ['50px', 'calc(30px + 3vw)', 'calc(30px + 3vw)'],
                lineHeight: 'calc(30px + 3vw)',
                fontWeight: 700,
                textShadow: '0 0 50px shadow',
                paddingBottom: [20, 0, 0]
              }}
            >
              <Col>{cv.about.entry.name.toLocaleUpperCase()}</Col>
            </Row>
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: ['column', 'row', 'row']
              }}
            >
              <Row
                sx={{
                  fontSize: 'calc(15px + 1vw)',
                  lineHeight: 'calc(15px + 1vw)',
                  fontWeight: 400,
                  textShadow: '0 0 50px shadow'
                }}
              >
                <Col>{cv.about.entry.label.toLocaleUpperCase()}</Col>
              </Row>
              <Row
                sx={{
                  height: 20
                }}
              >
                <Col>
                  <DynamicImage
                    image={currentRole.logo}
                    sx={{
                      ...centeredStyle,
                      height: 20,
                      paddingTop: [10, 0, 0]
                    }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Container>
      <Container
        fluid
        sx={{
          justifyContent: 'center',
          display: ['none', 'flex', 'flex']
        }}
      >
        <ScrollIndicator
          sx={{
            bottom: '28%'
          }}
        />
      </Container>
    </section >
  ), [p5Ref, cv.about.entry, currentRole]);
});

SketchBackstretch.displayName = 'SketchBackstretch';

export default SketchBackstretch;
