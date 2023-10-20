import { Document } from "@contentful/rich-text-types";
import { Media } from "./Includes";

export type Post = {
  id: string;
  title: string;
  content: Document;
  excerpt: string;
  media?: Media;
  tags: string[];
  sys: Sys;
};

export type Sys = {
  id: string;
  version: null;
  revision: number;
  createdAt: Date;
  updatedAt: Date;
};
