"use client";

import {TypeWorkFields} from "@/types/contentful";
import {SmallHeader} from "@/components/header/SmallHeader";
import {formatDuration} from "@/components/utils/date_utils";
import {Lanyard} from "@/components/ui/Lanyard";
import {ReadMore} from "@/components/ui/ReadMore";
import {documentToPlainTextString} from "@contentful/rich-text-plain-text-renderer";
import {documentToReactComponents} from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import {buildImageUri} from "@/lib/image";
import { motion } from "framer-motion";
import React, {ReactNode} from "react";
import {Block, BLOCKS, Inline} from "@contentful/rich-text-types";

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
}

export const WorkItem: React.FC<WorkItemProps> = ({experience}) => {
    return (
        <motion.div
            className="flex flex-col flex-shrink-0 w-full md:w-4/5 lg:w-1/2 pt-8"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of element is visible
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div>
                <SmallHeader className="mb-8 pb-4 gap-x-2">
                    <div className="text-m">
                        {formatDuration(experience.startDate, experience.endDate)}
                    </div>
                    <div className="text-3xl">
                        {experience.company}
                    </div>
                    <div className="text-2xl">
                        {experience.position}
                    </div>
                </SmallHeader>

                <div className="rounded bg-gray-900 p-6 flex flex-col gap-y-4">
                    <Lanyard className="font-[family-name:var(--font-argentum)]" tags={experience.highlights ?? []} />

                    <div className="flex flex-col items-center justify-between h-fit">
                        <ReadMore
                            className="mb-8"
                            characterCount={
                                documentToPlainTextString(experience.summary).length
                            }
                        >
                            {documentToReactComponents(experience.summary, options)}
                        </ReadMore>

                        <div className="relative h-12 w-24 flex items-end">
                            <Image
                                src={buildImageUri(
                                    experience.logo.fields.file?.url as string
                                )}
                                className="object-contain"
                                alt={
                                    (experience.logo.fields.description as string) ??
                                    "Work logo"
                                }
                                fill
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
