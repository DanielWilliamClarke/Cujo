import { getAbout } from "@/lib/caches/about";

import { buildImageUri } from "@/lib/image";
import Image from "next/image";
import dynamic from "next/dynamic";

const SketchHeader = dynamic(() => import("@/components/SketchHeader"), {
  ssr: false,
});

export default async function Header() {
  const about = await getAbout();

  return (
    <div className="w-full h-full">
      <SketchHeader />
      <div className="absolute top-0 w-full h-full flex justify-center items-center">
        <div
          className="flex flex-col justify-center items-center w-full h-full bg-gray-950 text-center p-8 font-[family-name:var(--font-argentum)]"
          style={{
            background: `rgba(0,0,0,0.2)`,
            backdropFilter: "blur(2px) saturate(300%)",
          }}
        >
          <div className="w-3/4">
            <div className="text-7xl">{about.name.toLocaleUpperCase()}</div>
            <div className="text-3xl">{about.label.toLocaleUpperCase()}</div>
            <hr className="m-2" />
            <div className="flex justify-center gap-8 pt-1">
              {about.logos.map((logo, index) => (
                <div className="relative h-10 w-36" key={index}>
                  <Image
                    src={buildImageUri(logo.fields.file?.url as string)}
                    className="object-contain"
                    alt={(logo.fields.description as string) ?? "Header logo"}
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
