import React from "react";
import { useInjection } from "inversify-react";
import { DevIcon } from "../../model/CVModel";
import { IIconService } from "../../services/IconService";

import "./DevIcon.scss";

type DevIconProps = {
  icon: DevIcon;
  color?: string;
};

export const DevIconName: React.FC<DevIconProps> = ({ icon, color }: DevIconProps): JSX.Element => {
  const iconService = useInjection(IIconService.$);
  let iconComponent: JSX.Element;

  const Icon = iconService.get(icon.name);
  if (Icon) {
    iconComponent = <Icon className="icon-override" />;
  } else {
    iconComponent = (
      <span className={`icon devicon-${icon.icon}`} />
    );
  }

  return (
    <div className="dev-icon" style={{ color: color }}>
      {iconComponent}
      <p className="icon-name">{icon.name}</p>
    </div>
  );
};
