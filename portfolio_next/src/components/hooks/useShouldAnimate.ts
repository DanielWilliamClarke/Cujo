import { useState, useEffect } from "react";
import { useWindowSize } from "./useWindowSize";

export const useShouldAnimate = (minWidth: number = 700) => {
  const { width } = useWindowSize();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  useEffect(() => {
    if (width) {
      setShouldAnimate(width > minWidth);
    }
  }, [width, minWidth]);

  return shouldAnimate;
};
