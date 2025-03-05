import type { Asset, EntrySkeletonType, EntryFields } from "contentful";
import type { TypeProfileFields } from "./TypeProfile";

export interface TypeInterestsFields {
  name: EntryFields.Symbol;
  label: EntryFields.Symbol;
  email: EntryFields.Symbol;
  phone?: EntryFields.Symbol;
  website: EntryFields.Symbol;
  about: EntryFields.RichText;
  interests: EntryFields.RichText;
  images: Asset[];
  profiles: EntrySkeletonType<TypeProfileFields>[];
}

export type TypeInterests = EntrySkeletonType<TypeInterestsFields>;
