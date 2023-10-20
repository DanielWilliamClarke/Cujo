import React, { useContext } from "react";

export const initialPositionState = {
  position: 0,
  even: true,
};

const PositionContext = React.createContext(initialPositionState);

export const usePositionContext = () => useContext(PositionContext);

type PositionProviderProps = {
  position: number;
  even: boolean;
  children?: React.ReactNode;
};

export const PositionProvider: React.FC<PositionProviderProps> = ({
  position,
  children,
}) => (
  <PositionContext.Provider value={{ position, even: position % 2 === 0 }}>
    {children}
  </PositionContext.Provider>
);
