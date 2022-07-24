import React, { useMemo } from "react";
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

  const iconComponent = useMemo(() => {
    const Icon = iconService.get(icon.name);
    if (Icon) {
      return <Icon className="icon-override" />;
    } else {
      return <span className={`icon devicon-${icon.icon}`} />;
    }
  }, [iconService, icon]);

  return (
    <div className="dev-icon" style={{ color: color }}>
      {iconComponent}
      <p className="icon-name">{icon.name}</p>
    </div>
  );
};
