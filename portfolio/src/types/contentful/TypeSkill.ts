import type { EntrySkeletonType, EntryFields } from "contentful";
import type { TypeDevIconsFields } from "./TypeDevIcons";

export interface TypeSkillFields {
    icon: EntrySkeletonType<TypeDevIconsFields>;
    name: EntryFields.Symbol;
    level: EntryFields.Integer;
}

export type TypeSkill = EntrySkeletonType<TypeSkillFields>;
