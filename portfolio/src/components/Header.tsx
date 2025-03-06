import { getAbout } from "@/lib/caches/about";
import { SketchHeader } from "@/components/SketchHeader";

export default async function Header() {
  const about = await getAbout();

  return (
    <div className="w-full h-full">
      <SketchHeader />
      <div className="absolute top-0 w-full h-full flex justify-center items-center">
        <div
          className="p-12 bg-gray-950 text-center w-full font-[family-name:var(--font-argentum)]"
          style={{
            background: `rgba(0,0,0,0.3)`,
            backdropFilter: "blur(3px)",
          }}
        >
          <div className="text-7xl">{about.name.toLocaleUpperCase()}</div>
          <div className="text-3xl">{about.label.toLocaleUpperCase()}</div>
        </div>
      </div>
    </div>
  );
}
