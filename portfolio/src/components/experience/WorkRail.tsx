import React, { ReactNode } from "react";

type WorkRailProps = {
  className?: string;
  children: ReactNode;
};

export const WorkRail: React.FC<WorkRailProps> = ({ className, children }) => {
  return (
    <div className="flex justify-center pb-6">
      <div
        className={`${className} flex scrollbar-hide overflow-x-auto space-x-4`}
      >
        {children}
      </div>
    </div>
  );
};
