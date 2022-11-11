import React, { useMemo, useState } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren
} from 'react-circular-progressbar';
import VisibilitySensor from 'react-visibility-sensor';
import { ProgressProvider } from './ProgressProvider';
const interpolate = require('color-interpolate');

interface ProgressGaugeProps {
  value: number
  colors: string[]
  children: (color: string) => JSX.Element
}

export const ProgressGauge: React.FC<ProgressGaugeProps> =
  ({ value, colors, children }: ProgressGaugeProps): JSX.Element => {
    const [visible, setVisible] = useState(false);
    const colormap = useMemo(() => interpolate(colors), [colors]);

    return (
      <VisibilitySensor>
        {({ isVisible }: {isVisible: boolean} ) => {
          if (isVisible && !visible) {
            setVisible(isVisible);
          }

          return (
            <ProgressProvider
              valueStart={0}
              valueEnd={visible ? value : 1}
            >
              {(value: number): JSX.Element => {
                const color = colormap(value / 100);
                return (
                  <CircularProgressbarWithChildren
                    value={value}
                    circleRatio={0.75}
                    styles={buildStyles({
                      strokeLinecap: 'round',
                      rotation: 1 / 2 + 1 / 8,
                      trailColor: '#eeeeee55',
                      pathColor: color,
                      pathTransitionDuration: 2.0
                    })}
                  >
                    {children(color)}
                  </CircularProgressbarWithChildren>
                );
              }}
            </ProgressProvider>
          );
        }}
      </VisibilitySensor>
    );
  };
