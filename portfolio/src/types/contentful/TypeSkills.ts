import type { EntrySkeletonType, EntryFields } from "contentful";
import type { TypeSkillFields } from "./TypeSkill";

export interface TypeSkillsFields {
    summary: EntryFields.RichText;
    currentSummary: EntryFields.RichText;
    current: EntrySkeletonType<TypeSkillFields>[];
    favoriteSummary: EntryFields.RichText;
    favorite: EntrySkeletonType<TypeSkillFields>[];
    usedSummary: EntryFields.RichText;
    used: EntrySkeletonType<TypeSkillFields>[];
}

export type TypeSkills = EntrySkeletonType<TypeSkillsFields>;
