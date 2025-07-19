"use client";
import { useInView } from "framer-motion";
import { useRef } from "react";

type AnimationDirection = "left" | "right" | "up" | "down" | "scale" | "fade";

interface AnimationProps {
  ref: React.RefObject<any>;
  initial: {
    opacity: number;
    x?: number;
    y?: number;
    scale?: number;
  };
  animate: {
    opacity: number;
    x?: number;
    y?: number;
    scale?: number;
  };
}

export function useScrollAnimation(
  direction: AnimationDirection = "up",
  once: boolean = true
): AnimationProps {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const getAnimationProps = (): Omit<AnimationProps, "ref"> => {
    const baseProps = {
      initial: { opacity: 0 },
      animate: { opacity: isInView ? 1 : 0 },
    };

    switch (direction) {
      case "left":
        return {
          ...baseProps,
          initial: { ...baseProps.initial, x: -50 },
          animate: { ...baseProps.animate, x: isInView ? 0 : -50 },
        };
      case "right":
        return {
          ...baseProps,
          initial: { ...baseProps.initial, x: 50 },
          animate: { ...baseProps.animate, x: isInView ? 0 : 50 },
        };
      case "up":
        return {
          ...baseProps,
          initial: { ...baseProps.initial, y: 50 },
          animate: { ...baseProps.animate, y: isInView ? 0 : 50 },
        };
      case "down":
        return {
          ...baseProps,
          initial: { ...baseProps.initial, y: -50 },
          animate: { ...baseProps.animate, y: isInView ? 0 : -50 },
        };
      case "scale":
        return {
          ...baseProps,
          initial: { ...baseProps.initial, scale: 0.8 },
          animate: { ...baseProps.animate, scale: isInView ? 1 : 0.8 },
        };
      case "fade":
        return baseProps;
      default:
        return baseProps;
    }
  };

  return { ref, ...getAnimationProps() };
}
