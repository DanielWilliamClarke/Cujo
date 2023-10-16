/** @jsxImportSource theme-ui */

import React from 'react';

export type DividerProps = {
  background: string;
  foreground: string;
}

export const TriangleDivider: React.FC<DividerProps> = ({ background, foreground }: DividerProps): JSX.Element => {
  return (
    <div
      className="triangle-divider"
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
        sx={{
          height: 0,
          width: 0,
          borderTopColor: foreground,
          borderLeftColor: background,
          borderRightColor: background,
          borderLeft: '2000px solid transparent',
          borderRight: '2000px solid transparent',
          borderTop: '100px solid',
          marginLeft: -2000,
          marginTop: -100
        }}
      />
    </div>
  );
};
