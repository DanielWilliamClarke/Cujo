import { Component } from "react";
import { DevIcon } from "../../model/CVModel";
import { IconType } from "react-icons";
import { FaDeviantart } from "react-icons/fa";
import "./DevIcon.scss";

type DevIconProps = {
  icon: DevIcon;
  iconOverride?: IconType;
};

type DevIconState = {
  iconOverride: IconType | undefined;
};

export class DevIconName extends Component<DevIconProps, DevIconState> {
  componentDidMount() {
    this.setState({ iconOverride: this.brandToIcon(this.props.icon) });
  }

  render(): JSX.Element {
    let iconComponent: JSX.Element;
    if (this.state?.iconOverride) {
      iconComponent = <this.state.iconOverride className="icon-override" />;
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

  private brandToIcon(brand: DevIcon): IconType | undefined {
    switch (brand.name) {
      case "DeviantArt":
        return FaDeviantart;
      default:
        return;
    }
  }
}
