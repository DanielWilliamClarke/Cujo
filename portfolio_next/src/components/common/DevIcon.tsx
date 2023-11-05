/** @jsxImportSource theme-ui */
import { useInjection } from 'inversify-react';
import React, { useMemo } from 'react';
import { ThemeUIStyleObject } from 'theme-ui';

import { DevIcon } from '@Models/CVModel';

import { usePositionContext } from '@Hooks/PositionContext';

import { IIconService } from '@Services/IconService';

import { DynamicImage } from './DynamicImage';
import { GenericComponentProps } from './props';

type DevIconProps = GenericComponentProps & {
  icon: DevIcon;
  size: number;
  color?: string;
  hoverColor?: string;
  textStyle?: ThemeUIStyleObject;
  hideText?: boolean;
};

export const DevIconName: React.FC<DevIconProps> = ({
  className,
  icon,
  color,
  hoverColor,
  size,
  textStyle,
  hideText = false,
}: DevIconProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);

  const { even } = usePositionContext();

  const iconComponent = useMemo(() => {
    if (icon.icon === 'override' && icon.iconImage) {
      return (
        <DynamicImage
          image={icon.iconImage}
          sx={{
            width: size * 2,
            height: size * 2,
            marginX: 'auto',
          }}
        />
      );
    }

    const iconStyle: ThemeUIStyleObject = {
      fontSize: size,
      width: size,
      marginX: 'auto',
    };

    const Icon = iconService.get(icon.name);
    if (Icon != null) {
      return <Icon sx={iconStyle} />;
    } else {
      return <span className={`devicon-${icon.icon}`} sx={iconStyle} />;
    }
  }, [iconService, icon, size]);

  return (
    <div
      className={className}
      sx={{
        textAlign: ['center', undefined, undefined],
        color,
        transition: '0.5s',
        '&:hover': {
          transform: 'scale(1.2)',
          color: hoverColor ?? (even ? 'accent' : 'secondary'),
        },
      }}
    >
      {iconComponent}
      {!hideText && <div sx={textStyle}>{icon.name}</div>}
    </div>
  );
};
