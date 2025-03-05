import { unstable_cache } from "next/cache";
import { TypeInterests, TypeInterestsFields } from "@/types/contentful";
import { client } from "@/lib/contentful_client";

export const getAbout = unstable_cache(
  async (): Promise<TypeInterestsFields> => {
    const entries = await client.getEntries<TypeInterests>({
      content_type: "interests",
      include: 5,
    });
    return entries.items[0].fields;
  },
  ["about"],
  { tags: ["about"] }
);
