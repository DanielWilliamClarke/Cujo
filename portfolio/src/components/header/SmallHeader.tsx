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
  // // bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
  return (
    <Floating
      floatY={0.5}
      floatX={1.0}
      grow={1}
      delay={Math.random() * (0.8 - 0.6) + 0.6}
      speed={Math.random() * (4 - 2) + 2}
      className={`${className} font-[family-name:var(--font-argentum)]
         bg-[linear-gradient(to_right,#e850a6,#d563c0,#bd74d3,#a283e0,#8790e6,#a192e7,#b993e6,#ce95e4,#ff90c6,#ff9a9a,#ffb672,#fbd85f)]
              bg-[length:100%_5px] bg-no-repeat bg-bottom`}
    >
      {children}
    </Floating>
  );
};
