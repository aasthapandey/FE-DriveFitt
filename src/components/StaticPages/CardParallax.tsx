import Image from "next/image";
import styles from "./CardParallax.module.scss";
import { useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
const CardParallax = ({
  title,
  description,
  backgroundImage,
  url,
  mobileUrl,
  progress,
  range,
  targetScale,
  isMobile,
}: {
  title?: string;
  description?: string;
  src: string;
  backgroundImage?: string;
  url: string;
  mobileUrl?: string;
  color: string;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  isMobile?: boolean;
}) => {
  const container = useRef(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  // Helper function to render HTML description
  const createMarkup = (htmlString: string) => {
    return { __html: htmlString };
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
            <p
              className={styles.description}
              dangerouslySetInnerHTML={
                description ? createMarkup(description) : undefined
              }
            />
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
              <div className={styles.imageWrapper}>
                <Image
                  fill
                  src={isMobile && mobileUrl ? mobileUrl : url}
                  alt={title || "image"}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardParallax;
