import { CardParallaxProps } from "@/types/staticPages";
import StaticCard from "@/components/StaticPages/StaticCard";
import TitleDescription from "@/components/common/TitleDescription";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import Image from "next/image";
import styles from "./CardParallax.module.scss";
import { useTransform, useScroll, motion, MotionValue } from "framer-motion";

import { useRef } from "react";
const CardParallax = ({
  title,
  description,
  src,
  backgroundImage,
  url,
  color,
  i,
  progress,
  range,
  targetScale,
}: {
  title?: string;
  description?: string;
  src: string;
  backgroundImage?: string;
  url: string;
  color: string;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Helper function to render description with highlighted text
  const renderDescription = (text: string) => {
    // For now, we'll handle Glenn Maxwell specifically, but this can be made more generic
    const parts = text.split(
      /(Glenn Maxwell|fitness, athlete development, and recovery)/
    );

    return parts.map((part, index) => {
      if (part === "Glenn Maxwell") {
        return (
          <span key={index} className={styles.highlighted}>
            {part}
          </span>
        );
      } else if (part === "fitness, athlete development, and recovery") {
        return (
          <span key={index} className={styles.specialText}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        className={styles.card}
        style={{
          scale,
        }}
      >
        <div className={styles.cardContent}>
          <div className={styles.leftContent}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>
              {description ? renderDescription(description) : ""}
            </p>
          </div>

          <div className={styles.rightContent}>
            <div className={styles.imageContainer}>
              {backgroundImage && (
                <div
                  className={styles.backgroundImage}
                  style={{
                    backgroundImage: `url(/images/${backgroundImage})`,
                  }}
                />
              )}
              <motion.div
                className={styles.imageWrapper}
                style={{
                  scale: imageScale,
                }}
              >
                <Image
                  fill
                  src={`/images/${src}`}
                  alt={title || "image"}
                  className={styles.image}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardParallax;
