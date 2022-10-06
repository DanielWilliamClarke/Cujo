import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import cors from 'cors';
import express from 'express';
import path from "path";
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouterContext } from "react-router";
import { StaticRouter } from 'react-router-dom';
import App from "./App";
import { runtimeConfig } from './config';

const assets: Record<string, any> = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const cssLinksFromAssets = (assets: Record<string, any>, entrypoint: string) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
    assets[entrypoint].css.map((asset: any) =>
      `<link rel="stylesheet" href="${asset}">`
    ).join('') : '' : '';
};

// const jsScriptTagsFromAssets = (assets: Record<string, any>, entrypoint: string, extra = '') => {
//   return assets[entrypoint] ? assets[entrypoint].js ?
//     assets[entrypoint].js.map((asset: any) =>
//       `<script src="${asset}"${extra}></script>`
//     ).join('') : '' : '';
// };

export const renderApp = (req: express.Request, res: express.Response) => {
  const context: StaticRouterContext = {};

  // We create an extractor from the statsFile
  const extractor = new ChunkExtractor({
    statsFile: path.resolve("build/loadable-stats.json"),
    // razzle client bundle entrypoint is client.js
    entrypoints: ["client"],
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
      <script>window.env = ${JSON.stringify(runtimeConfig)};</script>
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
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const { html = '', redirect = false } = renderApp(req, res);
    if (redirect) {
      res.redirect(redirect);
    } else {
      res.send(html);
    }
  });

export default server;