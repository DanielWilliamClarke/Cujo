declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;
  export = Schema;
}

declare module '*.otf';
declare module '*.ttf';

declare module 'pdfjs-dist/legacy/build/pdf.worker.entry';
