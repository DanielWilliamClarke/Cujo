import { getExperience } from "@/lib/caches/experience";
import { SmallHeader } from "@/components/header/SmallHeader";
import { Rail } from "@/components/ui/Rail";
import { WorkItem } from "@/components/experience/WorkItem";
import { EducationItem } from "@/components/experience/EducationItem";
import { getEducation } from "@/lib/caches/education";

export default async function Experience() {
  const experience = await getExperience();
  const education = await getEducation();

  return (
    <div className="flex justify-center gap-8 min-h-screen">
      <div className="w-full">
        <SmallHeader className="text-3xl w-1/2 mb-8" text="Experience">
          My Experience
        </SmallHeader>
        <Rail>
          {experience.map((experience, index) => (
            <WorkItem key={index} experience={experience} />
          ))}
          {education.map((education, index) => (
            <EducationItem key={index} education={education} />
          ))}
        </Rail>
      </div>
    </div>
  );
}
