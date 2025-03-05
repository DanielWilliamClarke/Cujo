import type { Asset, EntrySkeletonType, EntryFields } from "contentful";

export interface TypeDevIconsFields {
    name: EntryFields.Symbol;
    icon: EntryFields.Symbol;
    iconImage?: Asset;
}

export type TypeDevIcons = EntrySkeletonType<TypeDevIconsFields>;
