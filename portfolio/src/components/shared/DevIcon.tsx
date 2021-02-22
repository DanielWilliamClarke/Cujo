import { Component } from "react";
import { DevIcon } from "../../model/CV";

type DevIconProps = {
  icon: DevIcon;
};

export class DevIconName extends Component<DevIconProps> {
  render(): JSX.Element {
    return (
      <div className="dev-icon">
        <span className={`icon devicon-${this.props.icon.icon}`} />
        <p className="icon-name">{this.props.icon.name}</p>
      </div>
    );
  }
}
