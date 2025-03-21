import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";

export default async function Home() {
  return (
    <div className="flex justify-center">
      <div className="px-8 md:mx-12 w-full lg:max-w-[90%]">
        <About />
        <Experience />
      </div>
    </div>
  );
}
