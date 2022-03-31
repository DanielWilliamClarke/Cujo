import { Document } from '@contentful/rich-text-types';

export interface Post {
  id:      string;
  title:   string;
  content: Content;
  excerpt: string;
  media?:  Media;
  tags:    string[];
  sys:    BlogPostSys;
}

export interface Content {
  document: Document;
  includes: Includes;
}

export interface Includes {
  Asset: Asset[];
}

export interface Asset {
  fields:   Media;
  metadata: Metadata;
  sys:      AssetSys;
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
  uploadUrl?:  null;
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

export interface AssetSys {
  createdAt:   Date;
  environment: Environment;
  id:          string;
  locale:      string;
  revision:    number;
  space:       Environment;
  type:        string;
  updatedAt:   Date;
}

export interface Environment {
  sys: EnvironmentSys;
}

export interface EnvironmentSys {
  id:       string;
  linkType: string;
  type:     string;
}

export interface BlogPostSys {
  id:        string;
  version:   null;
  revision:  number;
  createdAt: Date;
  updatedAt: Date;
}

export const getAsset =
  (includes: Includes, id: string): Media | undefined =>
    includes.Asset.find((asset: Asset) => asset.sys.id === id)
    ?.fields
