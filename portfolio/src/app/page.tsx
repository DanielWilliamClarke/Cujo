import About from "@/components/About";
import Experience from "@/components/Experience";

export default async function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <About />
        <Experience />
      </div>
    </div>
  );
}
