import { Provider } from 'inversify-react';
import { NextUrqlClientConfig, withUrqlClient } from 'next-urql';
import React from 'react';
import { ThemeUIProvider } from 'theme-ui';
import { useQuery } from 'urql';

import { CujoProps, cujoServiceUrl } from './CujoISR';
import { CujoQuery } from './CujoQuery';
import { AppContextProvider } from './components/hooks/AppContext';
import { container } from './ioc';
import { theme } from './theme';

type CujoProviderProps = {
  Component: React.FC
};

const CujoProvider: React.FC<CujoProviderProps> = ({
  Component,
}: CujoProviderProps): JSX.Element => {
  const [{ data, error }] = useQuery<CujoProps>({ query: CujoQuery });

  if (!data || error) {
    throw error;
  }

  return (
    <Provider container={container}>
      <ThemeUIProvider theme={theme}>
        <AppContextProvider cv={data.cv} blog={data.blog}>
          <Component />
        </AppContextProvider>
      </ThemeUIProvider>
    </Provider>
  );
};

export const wrapPage = (Component: React.FC) => {
  const urqlConfigBuilder: NextUrqlClientConfig = () => ({ url: cujoServiceUrl() });

  const wrapper = withUrqlClient(urqlConfigBuilder);

  const Cujo = () => <CujoProvider Component={Component} />;

  return wrapper(Cujo);
};
