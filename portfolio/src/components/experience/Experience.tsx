import { getExperience } from "@/lib/caches/experience";
import { SmallHeader } from "@/components/header/SmallHeader";
import { Block, BLOCKS, Inline } from "@contentful/rich-text-types";
import { ReactNode } from "react";
import { WorkRail } from "@/components/experience/WorkRail";
import {WorkItem} from "@/components/experience/WorkItem";



export default async function Experience() {
  const experience = await getExperience();

  return (
    <div className="flex justify-center gap-8 min-h-screen">
      <div className="w-full">
        <SmallHeader className="text-3xl w-1/2" text="Experience">
          My Experience
        </SmallHeader>
        <div>
          <WorkRail>
            {experience.map((experience, index) => (
              <WorkItem
                  key={index}
                  experience={experience}
              />
            ))}
          </WorkRail>
        </div>
      </div>
    </div>
  );
}
