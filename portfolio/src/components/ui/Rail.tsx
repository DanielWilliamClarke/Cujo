import React, { ReactNode } from "react";

type RailProps = {
  className?: string;
  children: ReactNode;
};

export const Rail: React.FC<RailProps> = ({ className = "", children }) => {
  return (
    <div className="flex justify-center pb-6">
      <div
        className={`${className} flex scrollbar-hide overflow-x-auto overflow-y-hidden space-x-4`}
      >
        {children}
      </div>
    </div>
  );
};
