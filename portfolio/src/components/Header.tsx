import { getAbout } from "@/lib/caches/about";

export default async function Header() {
  const about = await getAbout();

  return (
    <div className="flex items-center justify-items-center min-h-screen font-[family-name:var(--font-argentum)]">
      {about.name}
    </div>
  );
}
