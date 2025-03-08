import { unstable_cache } from "next/cache";
import {
  TypeInterests,
  TypeInterestsFields,
  TypeWork,
  TypeWorkFields,
} from "@/types/contentful";
import { client } from "@/lib/contentful_client";

export const getExperience = unstable_cache(
  async (): Promise<TypeWorkFields> => {
    const entries = await client.getEntries<TypeWork>({
      content_type: "work",
      include: 5,
    });
    return entries.items[0].fields;
  },
  ["about"],
  { tags: ["about"] }
);
