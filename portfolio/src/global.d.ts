declare module '*.scss' {
  const content: {[className: string]: string};
  export = content;
}

declare module "*.gql" {
  import { DocumentNode } from "graphql";

  const content: DocumentNode;
  export default content;
}

declare module 'pdfjs-dist/legacy/build/pdf.worker.entry';