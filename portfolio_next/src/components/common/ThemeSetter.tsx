/** @jsxImportSource theme-ui */
import { Player } from '@lottiefiles/react-lottie-player';
import React, { useRef } from 'react';
import { useColorMode } from 'theme-ui';

import switcher from '../../assets/theme_toggle.json';

export const ThemeSetter: React.FC = () => {
  const [mode, setMode] = useColorMode();

  const player = useRef<Player>(null);

  const getFrame = (isLight: boolean) => (isLight ? 0 : 134);
  const getDirection = (isLight: boolean) => (isLight ? 1 : -1);

  const toggle = () => {
    const isLight = mode === 'light';
    setMode(isLight ? 'dark' : 'light');

    player.current?.setSeeker(getFrame(isLight));
    player.current?.setPlayerDirection(getDirection(isLight));

    player.current?.play();
  };

  return (
    <div
      onClick={toggle}
      sx={{
        '.lf-player-container': {
          cursor: 'pointer',
          transition: '0.5s',

          '&:hover': {
            transform: 'scale(1.2)',
          },
        },
      }}
    >
      <Player
        onEvent={(event) => {
          if (event === 'load') {
            player.current?.setSeeker(getFrame(mode === 'light'));
          }
        }}
        ref={player}
        speed={1.5}
        autoplay={false}
        keepLastFrame={true}
        loop={false}
        controls={false}
        src={switcher}
        sx={{
          height: [50, 75, 75],
          width: [50, 75, 75],
        }}
      />
    </div>
  );
};
