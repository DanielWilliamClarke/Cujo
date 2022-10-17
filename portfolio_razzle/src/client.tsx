import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import App from './App';

loadableReady().then(() => {
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
}).catch((err) => {
  throw err;
});

if (module.hot != null) {
  module.hot.accept();
}

LogRocket.init('fjqkqf/cujo');
setupLogRocketReact(LogRocket);
