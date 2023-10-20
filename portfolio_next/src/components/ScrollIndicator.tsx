/** @jsxImportSource theme-ui */

import React, { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react'
import { ThemeUICSSObject } from 'theme-ui';
import { GenericComponentProps } from './props';

const move = keyframes`
  25% {
    opacity: 1;
  }

  33% {
    opacity: 1;
    transform: translateY(30px);
  }

  67% {
    opacity: 1;
    transform: translateY(40px);
  }

  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
`;

const chevronStyle: ThemeUICSSObject = {
  animation: `${move} 3s ease-out infinite`,
  height: 8,
  width: 28,
  opacity: 0,
  position: 'absolute',
  transform: 'scale3d(0.5, 0.5, 0.5)',

  '&:before,&:after': {
    content: '" "',
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '51%',
    backgroundColor: 'primary'
  },

  '&:before': {
    left: 0,
    transform: 'skew(0deg, 33deg)'
  },

  '&:after': {
    right: 0,
    transform: 'skew(0deg, -33deg)',
    width: '50%'
  }
}

export const ScrollIndicator: React.FC<GenericComponentProps> = ({ className }): JSX.Element => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => setVisible(window.scrollY === 0));
  }, []);

  return (
    <div
      className={className}
      sx={{
        height: 24,
        width: 24,
        opacity: visible ? 1 : 0,
        position: 'absolute',
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <div
        sx={{
          ...chevronStyle,
          animation: `${move} 3s ease-out 1s infinite`
        }}
      />
      <div sx={chevronStyle}></div>
      <div
        sx={{
          ...chevronStyle,
          animation: `${move} 3s ease-out 2s infinite`
        }}
      />
    </div >
  );
};
