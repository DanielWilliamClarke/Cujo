import React, { CSSProperties } from "react";

import "./TriangleDivider.scss";

export type DividerProps = {
  background: string;
  foreground: string;
};

export type withDividerState = {
  divider: DividerProps;
};

export class TriangleDivider extends React.Component<DividerProps> {
  render(): JSX.Element {
    const myStyle: CSSProperties = {
      borderLeftColor: this.props.background,
      borderRightColor: this.props.background,
      borderTopColor: this.props.foreground,
    };

    return (
      <div className="triangle-divider">
        <div style={myStyle}></div>
      </div>
    );
  }
}
