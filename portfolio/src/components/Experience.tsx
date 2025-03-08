import { getExperience } from "@/lib/caches/experience";

export default async function Experience() {
  const experience = await getExperience();

  return (
    <div className="flex justify-center gap-8 min-h-screen">
      <div className="w-full">
        <div
          className="text-3xl w-1/2 font-[family-name:var(--font-argentum)]
             bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
              bg-[length:100%_5px] bg-no-repeat bg-bottom"
        >
          Experience
        </div>
      </div>
    </div>
  );
}
