import { Player } from '@lottiefiles/react-lottie-player';
import React, { useContext, useRef } from 'react';

import switcher from '../../assets/theme_toggle.json';

import ThemeContext from './ThemeContext';

enum ThemeOptions {
  LIGHT = 'light',
  DARK = 'dark',
}

export const ThemeSetter: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const player = useRef<Player>(null);

  const getFrame = (isLight: boolean) => (isLight ? 0 : 134);
  const getDirection = (isLight: boolean) => (isLight ? 1 : -1);

  const toggle = () => {
    const isLight = theme === ThemeOptions.LIGHT;
    setTheme(isLight ? ThemeOptions.DARK : ThemeOptions.LIGHT);

    player.current?.setSeeker(getFrame(isLight));
    player.current?.setPlayerDirection(getDirection(isLight));

    player.current?.play();
  };

  return (
    <div className="theme-toggle" onClick={toggle}>
      <Player
        className="theme-icon"
        onEvent={(event) => {
          if (event === 'load') {
            player.current?.setSeeker(getFrame(theme === ThemeOptions.LIGHT));
          }
        }}
        ref={player}
        speed={1.5}
        autoplay={false}
        keepLastFrame={true}
        loop={false}
        controls={false}
        src={switcher}
      />
    </div>
  );
};
