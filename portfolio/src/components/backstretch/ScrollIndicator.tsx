import { Component } from "react";

import "./ScrollIndicator.scss"

type IndicatorState = {
    visible: boolean;
};

export class ScrollIndicator extends Component<{}, IndicatorState> {

    listenScrollEvent = () => {
      if (window.scrollY === 0) {
        this.setState({ visible: true });
      } else {
        this.setState({ visible: false });
      }
    };

    componentWillMount() {
        this.setState({ visible: true });
        window.addEventListener("scroll", this.listenScrollEvent);
    }

    render(): JSX.Element {
        return (
            <div className={`indicator-container ${this.state.visible ? "visible" : ""}`}>
                <div className="chevron"></div>
                <div className="chevron"></div>
                <div className="chevron"></div>
                <span className="text">Scroll down</span>
            </div>
        );
    }
}
