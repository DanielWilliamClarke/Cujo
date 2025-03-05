import type { Asset, EntrySkeletonType, EntryFields } from "contentful";

export interface TypeWorkFields {
  position: EntryFields.Symbol;
  company: EntryFields.Symbol;
  website?: EntryFields.Symbol;
  startDate: EntryFields.Date;
  endDate?: EntryFields.Date;
  summary: EntryFields.RichText;
  highlights?: EntryFields.Symbol[];
  logo: Asset;
  images?: Asset[];
  hideFromCv?: EntryFields.Boolean;
}

export type TypeWork = EntrySkeletonType<TypeWorkFields>;
