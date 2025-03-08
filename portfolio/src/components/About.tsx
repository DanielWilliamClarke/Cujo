import { getAbout } from "@/lib/caches/about";
import { ReactNode } from "react";
import { INLINES, MARKS } from "@contentful/rich-text-types";
import {
  CommonNode,
  documentToReactComponents,
} from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { buildImageUri } from "@/lib/image";

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

const offsets = [
  "translate-y-[-30px]", // Top-left
  "translate-y-[30px]", // Top-right
  "translate-y-[-30px]", // Bottom-left
  "translate-y-[30px]", // Bottom-right
];

export default async function About() {
  const { about, interests, images } = await getAbout();

  return (
    <div className="flex justify-center items-center gap-8  min-h-screen">
      <div className="w-1/3">
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <div className={`relative h-80 ${offsets[index]}`} key={index}>
              <Image
                src={buildImageUri(image.fields.file?.url as string)}
                className="object-cover rounded-lg "
                alt={(image.fields.description as string) ?? "About image"}
                fill
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-2/3 gap-8">
        <div
          className="text-3xl w-1/2 font-[family-name:var(--font-argentum)]
             bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500
              bg-[length:100%_5px] bg-no-repeat bg-bottom"
        >
          About Me
        </div>
        <div className="flex flex-col gap-y-4">
          {documentToReactComponents(about, statementOptions)}
        </div>
        <div>{documentToReactComponents(interests, options)}</div>
      </div>
    </div>
  );
}
