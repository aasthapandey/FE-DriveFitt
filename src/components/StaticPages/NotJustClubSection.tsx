"use client";
import { NotJustClubItem, NotJustClubSectionProps } from "@/types/staticPages";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface ListItemProps {
  item: NotJustClubItem;
  isActive: boolean;
  position: "top" | "middle" | "bottom";
  className?: string;
}

const ListItem = ({
  item,
  isActive,
  position,
  className = "",
}: ListItemProps) => {
  const variants: Variants = {
    top: {
      opacity: 0.5,
      y: -20, // Moved up to show less of top item
      color: "rgba(255, 255, 255, 0.5)",
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1], // easeInOut
        color: { duration: 0.5 },
        opacity: { duration: 0.5 },
      },
    },
    middle: {
      opacity: 1,
      y: 60, // Middle item at 0 position
      color: "#00DBDC",
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1], // easeInOut
        color: { duration: 0.5 },
        opacity: { duration: 0.5 },
      },
    },
    bottom: {
      opacity: 0.5,
      y: 140, // Bottom item fully visible
      color: "rgba(255, 255, 255, 0.5)",
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1], // easeInOut
        color: { duration: 0.5 },
        opacity: { duration: 0.5 },
      },
    },
    exit: {
      opacity: 0,
      y: -160, // Adjusted exit position
      color: "rgba(255, 255, 255, 0.5)",
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1], // easeInOut
        color: { duration: 0.5 },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <motion.div
      className={`flex gap-6 items-center absolute left-0 ${className}`}
      variants={variants}
      initial={position === "bottom" ? { opacity: 0, y: 160 } : false}
      animate={position}
      exit="exit"
    >
      <Image
        src={item.icon}
        alt={item.description}
        width={60}
        height={60}
        className="size-10 md:size-[60px]"
      />
      <motion.span className="text-5xl font-semibold leading-[56px] tracking-[-2px]">
        {item.description}
      </motion.span>
    </motion.div>
  );
};

interface NotJustClubSectionComponentProps {
  data: NotJustClubSectionProps;
  className?: string;
  isMobile?: boolean;
}

const NotJustClubSection = ({
  data,
  className = "",
  isMobile = false,
}: NotJustClubSectionComponentProps) => {
  const { title, bgImg, list } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<NotJustClubItem[]>([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= list.length - 1) {
          setKey((k) => k + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 750);

    return () => clearInterval(interval);
  }, [list.length]);

  useEffect(() => {
    const items = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + list.length) % list.length;
      items.push(list[index]);
    }
    setVisibleItems(items);
  }, [activeIndex, list]);

  return (
    <section className={`md:px-[120px] px-6 flex flex-col gap-5 ${className}`}>
      <div
        className="rounded-[20px] md:rounded-[40px] p-[2px] h-[256px] md:h-[364px]"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[20px] md:rounded-[40px] bg-[#0D0D0D] w-full h-full flex flex-col justify-center relative"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="pl-[92px] flex gap-6 items-center justify-start">
            <h1 className="text-5xl font-semibold leading-[56px] tracking-[-2px] w-fit">
              {title}
            </h1>
            <div className="flex flex-col gap-7 relative flex-1 h-[176px] overflow-hidden">
              <AnimatePresence mode="popLayout" key={key}>
                {visibleItems.map((item, index) => (
                  <ListItem
                    key={`${item.description}-${index}`}
                    item={item}
                    isActive={index === 1}
                    position={
                      index === 0 ? "top" : index === 1 ? "middle" : "bottom"
                    }
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotJustClubSection;
