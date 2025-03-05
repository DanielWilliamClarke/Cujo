import type { Asset, EntrySkeletonType, EntryFields } from "contentful";

export interface TypeReadingListFields {
    title: EntryFields.Symbol;
    cover: Asset;
    author: EntryFields.Symbol;
    progress: "COMPLETED" | "NOT_STARTED" | "PRIORITY" | "READING";
    amazonLink?: EntryFields.Text;
}

export type TypeReadingList = EntrySkeletonType<TypeReadingListFields>;
