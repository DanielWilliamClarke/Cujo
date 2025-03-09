import { unstable_cache } from "next/cache";
import { TypeEducation, TypeEducationFields } from "@/types/contentful";
import { client } from "@/lib/contentful_client";

export const getEducation = unstable_cache(
  async (): Promise<TypeEducationFields[]> => {
    const entries = await client.getEntries<TypeEducation>({
      content_type: "education",
      include: 5,
      order: "-fields.startDate",
    });
    return entries.items.map(({ fields }) => fields);
  },
  ["education"],
  { tags: ["education"] }
);
