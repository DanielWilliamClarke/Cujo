import { getExperience } from "@/lib/caches/experience";
import { SmallHeader } from "@/components/header/SmallHeader";
import { Rail } from "@/components/ui/Rail";
import { WorkItem } from "@/components/experience/WorkItem";

export default async function Experience() {
  const experience = await getExperience();

  return (
    <div className="flex justify-center gap-8 min-h-screen">
      <div className="w-full">
        <SmallHeader className="text-3xl w-1/2" text="Experience">
          My Experience
        </SmallHeader>
        <div>
          <Rail>
            {experience.map((experience, index) => (
              <WorkItem key={index} experience={experience} />
            ))}
          </Rail>
        </div>
      </div>
    </div>
  );
}
