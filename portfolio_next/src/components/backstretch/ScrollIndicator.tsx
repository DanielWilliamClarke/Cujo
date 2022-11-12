import React, { useEffect, useState } from 'react';

export const ScrollIndicator: React.FC = (): JSX.Element => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    window.addEventListener('scroll', () => setVisible(window.scrollY === 0));
  }, []);

  return (
    <div className={`indicator-container ${visible ? 'visible' : ''}`}>
      <div className="chevron"></div>
      <div className="chevron"></div>
      <div className="chevron"></div>
    </div>
  );
};
