"use client";
import { NotJustClubItem, NotJustClubSectionProps } from "@/types/staticPages";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  const variants = {
    top: {
      opacity: 0.5,
      y: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
    middle: {
      opacity: 1,
      y: 80,
      scale: 1,
      transition: { duration: 0.3 },
    },
    bottom: {
      opacity: 0.5,
      y: 160,
      scale: 0.9,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -80,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className={`flex gap-6 items-center absolute ${className}`}
      variants={variants}
      initial={position === "bottom" ? { opacity: 0, y: 240 } : false}
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
      <span
        className={`text-5xl font-semibold leading-[56px] tracking-[-2px] transition-colors duration-300
          ${isActive ? "text-[#00DBDC]" : "text-white/50"}`}
      >
        {item.description}
      </span>
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
          // Reset animation when reaching the end
          setKey((k) => k + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [list.length]);

  useEffect(() => {
    // Update visible items whenever activeIndex changes
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
          <div className="pl-[90px] flex gap-6 items-center justify-start">
            <h1 className="text-5xl font-semibold leading-[56px] tracking-[-2px] w-[557px]">
              {title}
            </h1>
            <div className="flex flex-col gap-7 relative h-[240px] flex-1 justify-start">
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
