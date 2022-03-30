import { Component } from "react";
import { DevIcon } from "../../model/CVModel";
import { IconState, IIconService } from "../../services/IconService";

import "./DevIcon.scss";
import { resolve } from "inversify-react";

type DevIconProps = {
  icon: DevIcon;
};

export class DevIconName extends Component<DevIconProps, IconState> {
  @resolve("IconService") private readonly iconService!: IIconService;

  constructor(props: DevIconProps, context: {}) {
    super(props, context);
    this.state = { icon: this.iconService.get(this.props.icon.name) };
  }

  render(): JSX.Element {
    let iconComponent: JSX.Element;
    if (this.state?.icon) {
      iconComponent = <this.state.icon className="icon-override" />;
    } else {
      iconComponent = (
        <span className={`icon devicon-${this.props.icon.icon}`} />
      );
    }

    return (
      <div className="dev-icon">
        {iconComponent}
        <p className="icon-name">{this.props.icon.name}</p>
      </div>
    );
  }
}
