import type { Asset, EntrySkeletonType, EntryFields } from "contentful";

export interface TypeEducationFields {
  institution: EntryFields.Symbol;
  link?: EntryFields.Symbol;
  area: EntryFields.Symbol;
  studyType: EntryFields.Symbol;
  startDate: EntryFields.Date;
  endDate: EntryFields.Date;
  summary: EntryFields.RichText;
  grade?: EntryFields.Symbol;
  images?: Asset[];
}

export type TypeEducation = EntrySkeletonType<TypeEducationFields>;
