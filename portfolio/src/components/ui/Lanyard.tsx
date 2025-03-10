import React from "react";
import { Floating } from "@/components/ui/Floating";

type LanyardProps = {
  className?: string;
  tags: string[];
};

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
                  bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
          >
            {tag}
          </span>
        </Floating>
      ))}
    </div>
  );
};
