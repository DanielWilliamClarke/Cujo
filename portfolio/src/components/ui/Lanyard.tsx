import React from "react";
import { Floating } from "@/components/ui/Floating";

type LanyardProps = {
  className?: string;
  tags: string[];
};

//  bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
export const Lanyard: React.FC<LanyardProps> = ({
  className = "",
  tags,
}: LanyardProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {tags.map((tag: string, index) => (
        <Floating
          key={index}
          floatY={0.5}
          floatX={0.1}
          delay={Math.random() * (0.8 - 0.6) + 0.6}
          speed={Math.random() * (0.8 - 0.6) + 0.6}
        >
          <span
            key={tag}
            className="px-3 py-1 text-sm font-bold capitalize rounded-md text-white transition-transform duration-200
             bg-[linear-gradient(to_bottom_right,#e850a6,#d563c0,#bd74d3,#a283e0,#8790e6,#a192e7,#b993e6,#ce95e4,#ff90c6,#ff9a9a,#ffb672,#fbd85f)]"
          >
            {tag}
          </span>
        </Floating>
      ))}
    </div>
  );
};
