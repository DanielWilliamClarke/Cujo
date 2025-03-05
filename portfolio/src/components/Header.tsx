import { getAbout } from "@/lib/caches/about";
import {SketchHeader} from "@/components/SketchHeader";

export default async function Header() {
  const about = await getAbout();

  return (
    <div className="w-full h-full">
      <SketchHeader />
    </div>
  );
}
