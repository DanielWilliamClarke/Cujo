import { Component } from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import VisibilitySensor from "react-visibility-sensor";
import { ProgressProvider } from "../shared/ProgressProvider";
const interpolate = require("color-interpolate");

type ProgressGaugeProps = {
  value: number;
  colors: string[];
  children: (color: string) => JSX.Element;
};

type ProgressGaugeState = {
  colormap: any;
  isVisible: boolean;
};

export class ProgressGauge extends Component<
  ProgressGaugeProps,
  ProgressGaugeState
> {
  constructor(props: ProgressGaugeProps) {
    super(props);
    this.state = {
      colormap: interpolate(this.props.colors),
      isVisible: false,
    };
  }

  render(): JSX.Element {
    return (
      <VisibilitySensor>
        {({ isVisible }) => {
          if (isVisible && !this.state.isVisible) {
            this.setState({ isVisible });
          }

          return (
            <ProgressProvider
              valueStart={0}
              valueEnd={this.state.isVisible ? this.props.value : 1}
            >
              {(value: number): JSX.Element => {
                const color = this.state.colormap(value / 100);
                return (
                  <CircularProgressbarWithChildren
                    value={value}
                    circleRatio={0.75}
                    styles={buildStyles({
                      strokeLinecap: "round",
                      rotation: 1 / 2 + 1 / 8,
                      trailColor: "#eeeeee55",
                      pathColor: color,
                      pathTransitionDuration: 2.0,
                    })}
                  >
                    {this.props.children(color)}
                  </CircularProgressbarWithChildren>
                );
              }}
            </ProgressProvider>
          );
        }}
      </VisibilitySensor>
    );
  }
}
