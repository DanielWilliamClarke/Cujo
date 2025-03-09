"use client";

import React, { useState } from "react";

const MINIMUM_CHARACTER_COUNT = 400;

interface ExpandableContentProps extends React.PropsWithChildren {
  shownHeight?: number[];
  characterCount: number;
  className?: string;
  hideFadeOut?: boolean;
  expanded?: boolean;
}

export const ReadMore: React.FC<ExpandableContentProps> = ({
  children,
  shownHeights = "max-h-[200px] md:max-h-[300px]",
  characterCount,
  className = "",
  hideFadeOut = false,
  expanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const useExpandableContainer = characterCount >= MINIMUM_CHARACTER_COUNT;

  return (
    <div>
      <div
        className={
          `relative overflow-hidden ${className} ` +
          (useExpandableContainer && !isExpanded ? shownHeights : "max-h-full")
        }
        style={
          useExpandableContainer && !hideFadeOut && !isExpanded
            ? {
                maskImage:
                  "linear-gradient(to bottom, white 70%, transparent 100%)",
              }
            : {}
        }
      >
        {children}
      </div>

      {useExpandableContainer && (
        <button
          data-id="expandable-button"
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};
