import React, { CSSProperties } from 'react';

import './TriangleDivider.module.scss';

export interface DividerProps {
  background: string
  foreground: string
}

export const TriangleDivider: React.FC<DividerProps> = ({ background, foreground }: DividerProps): JSX.Element => {
  const myStyle: CSSProperties = {
    borderLeftColor: background,
    borderRightColor: background,
    borderTopColor: foreground
  };

  return (
    <div className="triangle-divider">
      <div style={myStyle}></div>
    </div>
  );
};
