"use client";

import { TypeEducationFields } from "@/types/contentful";
import { SmallHeader } from "@/components/header/SmallHeader";
import { formatDuration } from "@/components/utils/date_utils";
import { Lanyard } from "@/components/ui/Lanyard";
import { ReadMore } from "@/components/ui/ReadMore";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React, { ReactNode } from "react";
import { Block, BLOCKS, Inline } from "@contentful/rich-text-types";
import { FadeSlide } from "@/components/ui/FadeSlide";

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: Block | Inline, children: ReactNode) => (
      <p className="pt-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (_: Block | Inline, children: ReactNode) => (
      <ul className="list-disc">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_: Block | Inline, children: ReactNode) => (
      <ol className="list-decimal">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_: Block | Inline, children: ReactNode) => (
      <li className="ml-8">{children}</li>
    ),
  },
};

type EducationItemProps = {
  education: TypeEducationFields;
};

export const EducationItem: React.FC<EducationItemProps> = ({ education }) => {
  return (
    <FadeSlide
      className="flex flex-col flex-shrink-0 w-full md:w-4/5 lg:w-1/2 pt-8"
      y={25}
      opacity={0}
      duration={0.8}
    >
      <div>
        <SmallHeader className="mb-8 pb-2 gap-x-2">
          <p className="text-m">
            {formatDuration(education.startDate, education.endDate)}
          </p>
          <a
            href={education.link}
            target="_blank"
            className="text-3xl hover:underline"
          >
            {education.institution} ↬
          </a>
          <p className="text-2xl">{education.studyType}</p>
        </SmallHeader>

        <div className="rounded bg-gray-900 p-6 flex flex-col gap-y-4">
          <Lanyard
            className="font-[family-name:var(--font-argentum)]"
            tags={[education.grade ?? "", education.area].filter(Boolean)}
          />

          <div className="flex flex-col justify-between h-fit">
            <div className="mb-8">
              {documentToReactComponents(education.summary, options)}
            </div>
          </div>
        </div>
      </div>
    </FadeSlide>
  );
};
