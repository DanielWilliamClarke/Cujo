import type { Asset, EntrySkeletonType, EntryFields } from "contentful";
import type { TypeDevIconsFields } from "./TypeDevIcons";

export interface TypeProjectFields {
  rank: EntryFields.Integer;
  name: EntryFields.Symbol;
  link: EntryFields.Symbol;
  image: Asset;
  summary: EntryFields.RichText;
  tags?: EntryFields.Symbol[];
  icon: EntrySkeletonType<TypeDevIconsFields>;
}

export type TypeProject = EntrySkeletonType<TypeProjectFields>;
