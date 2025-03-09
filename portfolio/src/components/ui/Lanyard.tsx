import React from "react";

type LanyardProps = {
  tags: string[];
  className?: string;
};

export const Lanyard: React.FC<LanyardProps> = ({
  tags,
  className,
}: LanyardProps): JSX.Element => {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ""}`}>
      {tags.map((tag: string) => (
        <span
          key={tag}
          className="px-3 py-1 text-sm font-bold capitalize rounded-md text-white transition-transform duration-200 hover:scale-105
            bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
