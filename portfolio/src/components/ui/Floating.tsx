"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type FloatingProps = {
  className?: string;
  children: ReactNode;
  delay?: number;
  speed?: number;
  grow?: number;
  floatY?: number;
  floatX?: number;
};

export const Floating: React.FC<FloatingProps> = ({
  className = "",
  children,
  delay = 0,
  speed = 1,
  grow = 1.05,
  floatY = 0,
  floatX = 0,
}) => {
  return (
    <motion.div
      className={className}
      animate={["float"]}
      whileHover={["grow"]}
      variants={{
        grow: {
          scale: grow,
          transition: {
            delay,
            duration: 0.5,
          },
        },
        float: {
          y: [-floatY, floatY],
          x: [-floatX, floatX],
          rotate: 0.4,
          transition: {
            delay,
            duration: speed,
            repeat: Infinity,
            repeatType: "reverse",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
