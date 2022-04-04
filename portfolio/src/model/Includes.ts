export interface Entries<T> {
  entries: T[],
  includes: Includes
}

export interface Includes {
  Asset?: Asset[];
  Entry?: Entry[];
}

export interface Asset {
  fields:   Media;
  metadata: Metadata;
  sys:      Sys;
}

export interface Entry {
  fields:   any;
  metadata: Metadata;
  sys:      Sys;
}

export interface Media {
  description: string;
  file:        File;
  title:       string;
}

export interface File {
  contentType: string;
  details:     Details;
  fileName:    string;
  url:         string;
}

export interface Details {
  image: Image;
  size:  number;
}

export interface Image {
  height: number;
  width:  number;
}

export interface Metadata {
  tags: any[];
}

export interface Sys {
  createdAt:    Date;
  environment:  ContentType;
  id:           string;
  locale:       Locale;
  revision:     number;
  space:        ContentType;
  type:         SysType;
  updatedAt:    Date;
  contentType?: ContentType;
}

export interface ContentType {
  sys: ContentTypeSys;
}

export interface ContentTypeSys {
  id:       string;
  linkType: LinkType;
  type:     ContentTypeSysType;
}

export enum LinkType {
  ContentType = "ContentType",
  Entry = "Entry",
  Environment = "Environment",
  Space = "Space",
}

export enum ContentTypeSysType {
  Link = "Link",
}

export enum Locale {
  EnUS = "en-US",
}

export enum SysType {
  Asset = "Asset",
  Entry = "Entry",
}

export const getAsset =
  (includes: Includes, id: string): Media | undefined =>
    includes.Asset?.find((asset: Asset) => asset.sys.id === id)
    ?.fields
