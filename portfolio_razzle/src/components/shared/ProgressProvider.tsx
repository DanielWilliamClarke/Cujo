import React, { useEffect, useState } from "react";

type ProgressProps = {
  valueStart: number;
  valueEnd: number;
  children: (value: number) => JSX.Element;
};

export const ProgressProvider: React.FC<ProgressProps> = ({ valueStart, valueEnd, children }: ProgressProps): JSX.Element => {
  const [value, setValue] = useState(valueStart);

  useEffect(() => {
    const timeout = window.setTimeout(() => setValue(valueEnd), 0);
    return () => window.clearTimeout(timeout);
  });

  useEffect(() => {
    if (value !== valueEnd) {
      setValue(valueEnd);
    }
  }, [valueEnd, value]);

  return children(value);
};
