import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import compression from 'compression';
import expressStaticGzip from 'express-static-gzip';
import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export const renderApp = (req: express.Request, res: express.Response) => {
  const context: StaticRouterContext = {};

  // We create an extractor from the statsFile
  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    // razzle client bundle entrypoint is client.js
    entrypoints: ['client']
  });

  const markup = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    </ChunkExtractorManager>
  );

  // collect script tags
  const scriptTags = extractor.getScriptTags();

  // collect "preload/prefetch" links
  const linkTags = extractor.getLinkTags();

  // collect style tags
  const styleTags = extractor.getStyleTags();

  if (context.url) {
    return { redirect: context.url };
  } else {
    const html = `
    <!DOCTYPE html>
    <html lang="en"> 
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Daniel William Clarke - Portfolio and blog" />
  
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">

      ${linkTags}
      ${styleTags}

      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-H3X7HD4C7K"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-H3X7HD4C7K');
      </script>
    
      <title>Daniel William Clarke</title>
    </head>
    <body>
      <div id="root">${markup}</div>
      ${scriptTags}
    </body>
    </html>
    `;

    return { html };
  }
};

const server = express()
  .disable('x-powered-by')
  .use(cors())
  .options('*', cors())
  .use(compression())
  // Serve compressed clientside assetes
  .use(expressStaticGzip(process.env.RAZZLE_PUBLIC_DIR!, {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  }))
  // Proxy to backend service
  .use('/api', createProxyMiddleware({
    target: process.env.CUJO_SERVICE_URL,
    pathRewrite: { '^/api': '' },
    changeOrigin: true
  }))
  // Proxy to assets
  .use('/assets', createProxyMiddleware({
    target: process.env.CUJO_ASSETS_URL,
    changeOrigin: true
  }))
  // Serve website
  .get('/*', (req: express.Request, res: express.Response) => {
    const { html = '', redirect = false } = renderApp(req, res);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  });

export default server;
