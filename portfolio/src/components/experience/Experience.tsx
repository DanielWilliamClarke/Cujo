import { getExperience } from "@/lib/caches/experience";
import { SmallHeader } from "@/components/header/SmallHeader";
import Image from "next/image";
import { buildImageUri } from "@/lib/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Inline } from "@contentful/rich-text-types";
import { ReactNode } from "react";
import {WorkRail} from "@/components/experience/WorkRail";

const options = {
  renderNode: {
    [BLOCKS.UL_LIST]: (_: any, children: ReactNode) => (
      <ul className="list-disc">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (_: any, children: ReactNode) => <li>{children}</li>,
  },
};

export default async function Experience() {
  const experience = await getExperience();

  return (
    <div className="flex justify-center gap-8 min-h-screen">
      <div className="w-full">
        <SmallHeader className="text-3xl w-1/2" text="Experience">
          Experience
        </SmallHeader>
        <div>
          <WorkRail>
          {experience.map((experience, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className="flex flex-col flex-shrink-0 w-4/5 md:w-1/2 pt-8"
              >
                <div>
                  <SmallHeader className="text-l flex flex-row flex-wrap items-center mb-8 gap-x-2">
                    {`${experience.position} @`}
                    <div className="relative h-12 w-20" key={index}>
                      <Image
                        src={buildImageUri(
                          experience.logo.fields.file?.url as string
                        )}
                        className="object-contain"
                        alt={
                          (experience.logo.fields.description as string) ??
                          "Work logo"
                        }
                        fill
                      />
                    </div>
                  </SmallHeader>
                  <div className="rounded-xl bg-gray-900 p-8 flex flex-col items-center gap-y-4">
                    {documentToReactComponents(experience.summary, options)}
                    {experience.images && (
                        <div className="relative h-36 w-36" key={index}>
                          <Image
                              src={buildImageUri(
                                  experience.images[0].fields.file?.url as string
                              )}
                              className="object-cover rounded-full"
                              alt={
                                  (experience.images[0].fields.description as string) ??
                                  "Work logo"
                              }
                              fill
                          />
                        </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
          </WorkRail>
        </div>
      </div>
    </div>
  );
}
