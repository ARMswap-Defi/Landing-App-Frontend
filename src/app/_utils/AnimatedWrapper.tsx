"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children: ReactNode;
  from?: "left" | "right" | "up" | "bottom" | "center" | "rotate";
  delay?: number;
  rotateFrom?: number;
  rootMargin?: string; // Optional: Customize viewport margin
};

const AnimatedWrapper = ({
  children,
  from = "bottom",
  delay = 0,
  rotateFrom = 0,
  rootMargin = "0px",
}: Props) => {
  const { ref, inView } = useInView({
    rootMargin, // Controls when the element comes into view
    threshold: 0.2, // Trigger when 20% of the element is visible
    triggerOnce: true, // Only trigger animation once
  });

  const variants = {
    hidden: {
      opacity: 0,
      x: from === "left" ? -50 : from === "right" ? 50 : 0,
      y: from === "up" ? -50 : from === "bottom" ? 50 : 0,
      rotate: from === "rotate" ? rotateFrom : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
