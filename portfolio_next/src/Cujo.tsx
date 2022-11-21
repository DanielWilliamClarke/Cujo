
import { Provider } from 'inversify-react';
import { withUrqlClient } from 'next-urql';

import React from 'react';
import { useQuery } from 'urql';
import { CujoProps, cujoServiceUrl } from './CujoISR';
import { CujoQuery } from './CujoQuery';
import { container } from './ioc';

type CujoProviderProps = {
  children: (props: CujoProps) => JSX.Element
};

const CujoProvider: React.FC<CujoProviderProps> = ({ children }: CujoProviderProps): JSX.Element => {
  const [{ data, error }] = useQuery<CujoProps>({ query: CujoQuery });

  if (!data || error) {
    throw error;
  }

  return (
    <Provider container={container}>
      {children(data)}
    </Provider>
  )
}

const buildPage = (children: (props: CujoProps) => JSX.Element): React.FC => {
  const Cujo: React.FC = () => (
    <CujoProvider>
      {children}
    </CujoProvider>
  );

  return Cujo
}

export const wrapPage = (children: (props: CujoProps) => JSX.Element) => withUrqlClient(
  () => ({ url: cujoServiceUrl() }),
)(buildPage(children));