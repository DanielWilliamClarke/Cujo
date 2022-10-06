import React, { useState } from "react";

import "./ScrollIndicator.scss";

export const ScrollIndicator: React.FC = (): JSX.Element => {
  const [visible, setVisible] = useState(true);
  window.addEventListener("scroll", () => setVisible(window.scrollY === 0));

  return (
    <div className={`indicator-container ${visible ? "visible" : ""}`}>
      <div className="chevron"></div>
      <div className="chevron"></div>
      <div className="chevron"></div>
    </div>
  );
}
