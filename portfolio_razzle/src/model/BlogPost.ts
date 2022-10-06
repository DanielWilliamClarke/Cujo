import { Document } from '@contentful/rich-text-types';
import { Media } from './Includes';

export interface Post {
  id:      string;
  title:   string;
  content: Document;
  excerpt: string;
  media?:  Media;
  tags:    string[];
  sys:    Sys;
}

export interface Sys {
  id:        string;
  version:   null;
  revision:  number;
  createdAt: Date;
  updatedAt: Date;
}

