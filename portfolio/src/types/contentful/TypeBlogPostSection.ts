import type { EntrySkeletonType, EntryFields } from "contentful";

export interface TypeBlogPostSectionFields {
  slug: EntryFields.Symbol;
  title?: EntryFields.Symbol;
  content: EntryFields.RichText;
}

export type TypeBlogPostSection = EntrySkeletonType<TypeBlogPostSectionFields>;
