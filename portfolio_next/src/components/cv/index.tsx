import { Provider } from 'inversify-react';

import { container } from '@Cujo/ioc';
import { CV as CVModel } from '@Cujo/model/CVModel';

import { AppContextProvider } from '../hooks/AppContext';
import { CV } from './CV';

const stubBlog = { entries: [], includes: {} };

type CVPdfProps = {
  cv: CVModel;
};

export const CVPdf: React.FC<CVPdfProps> = ({ cv }) => (
  <Provider container={container}>
    <AppContextProvider cv={cv} blog={stubBlog}>
      <CV />
    </AppContextProvider>
  </Provider>
);
