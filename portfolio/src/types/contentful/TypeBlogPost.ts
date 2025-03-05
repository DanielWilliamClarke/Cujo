import type { Asset, EntrySkeletonType, EntryFields } from "contentful";

export interface TypeBlogPostFields {
  id: EntryFields.Symbol;
  title: EntryFields.Symbol;
  content: EntryFields.RichText;
  excerpt: EntryFields.Text;
  media?: Asset;
  tags?: EntryFields.Symbol[];
}

export type TypeBlogPost = EntrySkeletonType<TypeBlogPostFields>;
