import React, { ReactNode } from "react";

type SmallHeaderProps = {
  className?: string;
  children: ReactNode;
};

export const SmallHeader: React.FC<SmallHeaderProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`${className} font-[family-name:var(--font-argentum)]
             bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
              bg-[length:100%_5px] bg-no-repeat bg-bottom`}
    >
      {children}
    </div>
  );
};
