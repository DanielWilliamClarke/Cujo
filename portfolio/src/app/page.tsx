import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";

export default async function Home() {
  return (
    <div className="flex justify-center">
      <div className="px-4 w-full md:w-4/5">
        <About />
        <Experience />
      </div>
    </div>
  );
}
