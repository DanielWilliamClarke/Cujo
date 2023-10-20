import React, { Dispatch, SetStateAction } from "react";

export const initialThemeState = {
  theme: "dark",
  setTheme: (() => null) as Dispatch<SetStateAction<string>>,
};

const ThemeContext = React.createContext(initialThemeState);

export default ThemeContext;
