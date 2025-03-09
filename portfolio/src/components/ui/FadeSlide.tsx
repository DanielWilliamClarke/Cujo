import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type FadeSlideProps = {
  children: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  duration?: number;
  opacity?: number;
  ease?: string;
};

export const FadeSlide: React.FC<FadeSlideProps> = ({
  children,
  className,
  x = 0,
  y = 0,
  duration = 0.5,
  opacity = 1,
  ease = "easeOut",
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of element is visible
      transition={{ duration, ease }}
    >
      {children}
    </motion.div>
  );
};
