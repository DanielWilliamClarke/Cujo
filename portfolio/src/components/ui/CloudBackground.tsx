import { ReactNode } from "react";

type BorderedContainerProps = {
  className?: string;
  children: ReactNode;
};

export function CloudBackground({
  className = "after:opacity-50",
  children,
}: BorderedContainerProps) {
  return (
    <div
      className={`
            ${className} rounded  p-8 relative flex 
              bg-opacity-50
              after:content-[''] after:absolute after:rounded 
              after:w-[100.2%] after:h-[100.2%]
              after:-z-20
              after:opacity-50
              after:blur-[100px]
              after:-rotate-2
              after:bg-[linear-gradient(to_right_top,#e850a6,#d563c0,#bd74d3,#a283e0,#8790e6,#a192e7,#b993e6,#ce95e4,#ff90c6,#ff9a9a,#ffb672,#fbd85f)]
        `}
    >
      {children}
    </div>
  );
}
