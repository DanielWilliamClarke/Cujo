/** @jsxImportSource theme-ui */

import { getColor } from '@theme-ui/color';
import React from 'react';
import { Theme } from 'theme-ui';

export type DividerProps = {
  background: string;
  foreground?: string;
};

export const TriangleDivider: React.FC<DividerProps> = ({
  background,
  foreground,
}: DividerProps): JSX.Element => {
  return (
    <div
      sx={{
        height: 0,
        width: '50%',
        position: 'relative',
        top: -75,
        overflow: 'hidden',
        paddingTop: 100,
        paddingLeft: '50%',
        boxSizing: 'content-box',
      }}
    >
      <div
        sx={(t: Theme) => ({
          height: 0,
          width: 0,
          borderLeft: '2000px solid transparent',
          borderRight: '2000px solid transparent',
          borderTop: `100px solid ${getColor(t, foreground)}`,
          marginLeft: -2000,
          marginTop: -100,
        })}
      />
    </div>
  );
};
