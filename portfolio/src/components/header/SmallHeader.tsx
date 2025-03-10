import React, { ReactNode } from "react";
import { Floating } from "@/components/ui/Floating";

type SmallHeaderProps = {
  className?: string;
  children: ReactNode;
};

export const SmallHeader: React.FC<SmallHeaderProps> = ({
  className = "",
  children,
}) => {
  return (
    <Floating
      floatY={0.5}
      floatX={0.2}
      grow={1}
      delay={Math.random() * (0.8 - 0.6) + 0.6}
      speed={Math.random() * (0.8 - 0.6) + 0.6}
      className={`${className} font-[family-name:var(--font-argentum)]
             bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
              bg-[length:100%_5px] bg-no-repeat bg-bottom`}
    >
      {children}
    </Floating>
  );
};
