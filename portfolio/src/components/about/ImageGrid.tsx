"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { buildImageUri } from "@/lib/image";
import React from "react";
import { Asset } from "contentful";

type ImageGridProps = {
  images: Asset[];
};

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = (isLeft: boolean) => ({
    hidden: { opacity: 0, y: isLeft ? 100 : -100 },
    visible: {
      opacity: 1,
      y: isLeft ? 30 : -30,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  });

  return (
    <motion.div
      className="grid grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of parent is visible
    >
      {images.slice(0, 4).map((image, index) => {
        const isLeft = index % 2 === 0;
        return (
          <motion.div
            key={index}
            className={`relative h-80`}
            variants={itemVariants(isLeft)}
          >
            <Image
              src={buildImageUri(image.fields.file?.url as string)}
              className="object-cover rounded-lg"
              alt={(image.fields.description as string) ?? "About image"}
              fill
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
