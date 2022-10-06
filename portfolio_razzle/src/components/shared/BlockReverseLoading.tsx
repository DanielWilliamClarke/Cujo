import React, { CSSProperties } from "react";

import "./BlockReverseLoading.scss";

type LoadingProps = {
  style: CSSProperties;
  box: {
    speed: number;
    size: number;
  }
};

export const BlockReverseLoading: React.FC<LoadingProps> = ({ style, box }: LoadingProps): JSX.Element => {
  return (
    <div className="loading-container" style={style}>
      <div
        className="box"
        style={{
          width: box.size,
          height: box.size,
          animationDuration: `${box.speed}s`,
        }}
      />
    </div>
  );
};