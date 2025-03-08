import { getAbout } from "@/lib/caches/about";
import { ReactNode } from "react";
import { INLINES, MARKS } from "@contentful/rich-text-types";
import {
  CommonNode,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import { ImageGrid } from "@/components/about/ImageGrid";

const options = {
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }: CommonNode, children: ReactNode) => (
      <a href={data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

const statementOptions = {
  ...options,
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <b className="text-xl">{text}</b>,
  },
};

export default async function About() {
  const { about, interests, images } = await getAbout();

  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-8  min-h-screen">
      <div className="w-full md:w-1/3 pt-8">
        <ImageGrid images={images} />
      </div>
      <div className="md:w-2/3 gap-8 pt-8">
        <div
          className="text-3xl w-1/2 mb-8 font-[family-name:var(--font-argentum)]
             bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
              bg-[length:100%_5px] bg-no-repeat bg-bottom"
        >
          About Me
        </div>
        <div className="rounded-xl bg-gray-900 p-8 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-4">
            {documentToReactComponents(about, statementOptions)}
          </div>
          <div className="flex flex-col gap-y-1">
            {documentToReactComponents(interests, options)}
          </div>
        </div>
      </div>
    </div>
  );
}
