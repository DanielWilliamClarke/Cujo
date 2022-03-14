import { Document } from '@contentful/rich-text-types';

export interface ContentfulEntries {
  sys:      ContentfulEntriesSys;
  total:    number;
  skip:     number;
  limit:    number;
  items:    Item[];
  includes: Includes;
}

export interface Includes {
  Asset: Asset[];
}

export interface Asset {
  metadata: Metadata;
  sys:      AssetSys;
  fields:   AssetFields;
}

export interface AssetFields {
  title:       string;
  description: string;
  file:        File;
}

export interface File {
  url:         string;
  details:     Details;
  fileName:    string;
  contentType: string;
}

export interface Details {
  size:  number;
  image: Image;
}

export interface Image {
  width:  number;
  height: number;
}

export interface Metadata {
  tags: any[];
}

export interface AssetSys {
  space:        Media;
  id:           string;
  type:         string;
  createdAt:    Date;
  updatedAt:    Date;
  environment:  Media;
  revision:     number;
  locale:       string;
  contentType?: Media;
}

export interface Media {
  sys: MediaSys;
}

export interface MediaSys {
  id:       string;
  type:     string;
  linkType: string;
}

export interface Item {
  metadata: Metadata;
  sys:      AssetSys;
  fields:   ItemFields;
}

export interface ItemFields {
  id:       string;
  title:    string;
  content:  Document;
  excerpt:  string;
  media:    Media;
  tags:     string[];
  date:     string;
  modified: string;
}

export interface ContentfulEntriesSys {
  type: string;
}

export const getMediaURL =
  (includes: Includes, id: string): string | undefined =>
    includes.Asset.find((asset: Asset) => asset.sys.id === id)
    ?.fields.file.url
