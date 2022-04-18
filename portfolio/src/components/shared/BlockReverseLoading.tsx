import React, { CSSProperties } from "react";

import "./BlockReverseLoading.scss";

type BoxProps = {
  speed: number;
  size: number;
};

type LoadingProps = {
  style: CSSProperties;
  box: BoxProps;
};

export class BlockReverseLoading extends React.Component<LoadingProps> {
  render() {
    return (
      <div className="loading-container" style={this.props.style}>
        <div
          className="box"
          style={{
            width: this.props.box.size,
            height: this.props.box.size,
            animationDuration: `${this.props.box.speed}s`,
          }}
        />
      </div>
    );
  }
}
