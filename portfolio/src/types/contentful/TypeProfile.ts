import type { EntrySkeletonType, EntryFields } from "contentful";
import type { TypeDevIconsFields } from "./TypeDevIcons";

export interface TypeProfileFields {
    url: EntryFields.Symbol;
    brand: EntrySkeletonType<TypeDevIconsFields>;
}

export type TypeProfile = EntrySkeletonType<TypeProfileFields>;
