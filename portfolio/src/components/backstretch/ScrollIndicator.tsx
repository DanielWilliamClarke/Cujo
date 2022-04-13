import { Component } from "react";

import "./ScrollIndicator.scss";

type IndicatorState = {
  visible: boolean;
};

export class ScrollIndicator extends Component<{}, IndicatorState> {
  constructor(props: {}) {
    super(props);

    window.addEventListener("scroll", this.listenScrollEvent);
    this.state = { visible: true };
  }

  render(): JSX.Element {
    return (
      <div
        className={`indicator-container ${this.state.visible ? "visible" : ""}`}
      >
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
      </div>
    );
  }

  private listenScrollEvent = () => {
    this.setState({ visible: window.scrollY === 0 });
  };
}
