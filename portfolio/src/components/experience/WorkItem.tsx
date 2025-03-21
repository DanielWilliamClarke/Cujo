"use client";

import { TypeWorkFields } from "@/types/contentful";
import { SmallHeader } from "@/components/header/SmallHeader";
import { formatDuration } from "@/components/utils/date_utils";
import { Lanyard } from "@/components/ui/Lanyard";
import { ReadMore } from "@/components/ui/ReadMore";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import { buildImageUri } from "@/lib/image";
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

type WorkItemProps = {
  experience: TypeWorkFields;
};

export const WorkItem: React.FC<WorkItemProps> = ({ experience }) => {
  return (
    <FadeSlide
      className="flex flex-col flex-shrink-0 w-11/12 md:w-4/5 lg:w-1/2 pt-8"
      y={50}
      opacity={0}
      duration={0.8}
    >
      <div>
        <SmallHeader className="mb-8 pb-2 gap-x-2">
          <p className="text-m">
            {formatDuration(experience.startDate, experience.endDate)}
          </p>
          <a
            href={experience.website}
            target="_blank"
            className="text-3xl hover:underline"
          >
            {experience.company} ↬
          </a>
          <p className="text-2xl">{experience.position}</p>
        </SmallHeader>

        <div className="rounded bg-gray-900 bg-opacity-40 p-6 flex flex-col gap-y-4">
          <Lanyard
            className="font-[family-name:var(--font-argentum)]"
            tags={experience.highlights ?? []}
          />

          <div className="flex flex-col items-center justify-between h-fit">
            <div className="mb-8">
              {documentToReactComponents(experience.summary, options)}
            </div>

            <div className="relative h-12 w-24 flex items-end">
              <Image
                src={buildImageUri(experience.logo.fields.file?.url as string)}
                className="object-contain"
                alt={
                  (experience.logo.fields.description as string) ?? "Work logo"
                }
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </FadeSlide>
  );
};
