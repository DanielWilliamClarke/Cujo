export type Entries<T> = {
  entries: T[];
  includes: Includes;
};

export type Entry<T> = {
  entry: T;
  includes: Includes;
};

export type Includes = {
  Asset?: Asset[];
  Entry?: RefEntry[];
};

export type Asset = {
  fields: Media;
  metadata: Metadata;
  sys: Sys;
};

export type RefEntry = {
  fields: any;
  metadata: Metadata;
  sys: Sys;
};

export type Media = {
  description: string;
  file: File;
  title: string;
};

export type File = {
  contentType: string;
  details: Details;
  fileName: string;
  url: string;
};

export type Details = {
  image: Image;
  size: number;
};

export type Image = {
  height: number;
  width: number;
};

export type Metadata = {
  tags: any[];
};

export type Sys = {
  createdAt: Date;
  environment: ContentType;
  id: string;
  locale: Locale;
  revision: number;
  space: ContentType;
  type: SysType;
  updatedAt: Date;
  contentType?: ContentType;
};

export type ContentType = {
  sys: ContentTypeSys;
};

export type ContentTypeSys = {
  id: string;
  linkType: LinkType;
  type: ContentTypeSysType;
};

export enum LinkType {
  ContentType = 'ContentType',
  Entry = 'Entry',
  Environment = 'Environment',
  Space = 'Space',
}

export enum ContentTypeSysType {
  Link = 'Link',
}

export enum Locale {
  EnUS = 'en-US',
}

export enum SysType {
  Asset = 'Asset',
  Entry = 'Entry',
}

export const getAsset = (includes: Includes, id: string): Media | undefined =>
  includes.Asset?.find((asset: Asset) => asset.sys.id === id)?.fields;
