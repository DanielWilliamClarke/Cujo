import React from "react";
import { resolve } from "inversify-react";
import { DevIcon } from "../../model/CVModel";
import { IIconService } from "../../services/IconService";

import "./DevIcon.scss";

type DevIconProps = {
  icon: DevIcon;
  color?: string;
};

export class DevIconName extends React.Component<DevIconProps> {
  @resolve("IconService") private readonly iconService!: IIconService;

  render(): JSX.Element {
    let iconComponent: JSX.Element;

    const Icon = this.iconService.get(this.props.icon.name);
    if (Icon) {
      iconComponent = <Icon className="icon-override" />;
    } else {
      iconComponent = (
        <span className={`icon devicon-${this.props.icon.icon}`} />
      );
    }

    return (
      <div className="dev-icon" style={{ color: this.props.color }}>
        {iconComponent}
        <p className="icon-name">{this.props.icon.name}</p>
      </div>
    );
  }
}
