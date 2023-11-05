import React, { useContext } from 'react';

import { Post } from '@Cujo/model/BlogPost';
import { CV } from '@Cujo/model/CVModel';
import { Entries } from '@Cujo/model/Includes';

export const initialPositionState = {
  cv: {} as CV,
  blog: {} as Entries<Post>,
};

const AppContext = React.createContext(initialPositionState);

export const useAppContext = () => useContext(AppContext);

type AppContextProviderProps = {
  cv: CV;
  blog: Entries<Post>;
  children?: React.ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  cv,
  blog,
  children,
}) => (
  <AppContext.Provider value={{ cv, blog }}>{children}</AppContext.Provider>
);
