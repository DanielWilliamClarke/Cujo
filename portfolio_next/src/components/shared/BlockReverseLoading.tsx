/** @jsxImportSource theme-ui */

import React from 'react';
import { keyframes } from '@emotion/react'
import { ClassNameProps } from './props';

const reverseRotate = keyframes`
  33% {
    transform: rotateY(-180deg);
  }

  66% {
    transform: rotateY(-180deg) rotateX(-180deg);
  }

  100% {
    transform: rotateX(-180deg) rotateZ(-180deg);
  }
`

type LoadingProps = ClassNameProps & {
  box: {
    speed: number
    size: number
  }
}

export const BlockReverseLoading: React.FC<LoadingProps> = ({ className, box }: LoadingProps): JSX.Element => {
  return (
    <div
      className={className}
      sx={{
        position: 'relative',
        bottom: 0,
        right: 0,
        top: 0,
        left: 0,
        perspective: 120,
      }}
    >
      <div
        sx={{
          width: box.size,
          height: box.size,
          animationDuration: box.speed,
          borderRadius: 12,
          margin: 'auto',
          position: 'absolute',
          bottom: 0,
          right: 0,
          top: 0,
          left: 0,
          animation: `${reverseRotate} 3s infinite`,
          transform: 'rotate(0)',
          backgroundColor: 'accent'
        }}
      />
    </div>
  );
};
