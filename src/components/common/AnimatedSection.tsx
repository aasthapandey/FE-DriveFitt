"use client";
import { motion, Transition, Easing } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down" | "scale" | "fade";
  className?: string;
  delay?: number;
}

const AnimatedSection = ({
  children,
  direction = "up",
  className = "",
  delay = 0,
}: AnimatedSectionProps) => {
  const animation = useScrollAnimation(direction);

  const transition: Transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96] as Easing,
    delay,
  };

  return (
    <motion.div {...animation} transition={transition} className={className}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
