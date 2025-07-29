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
      opacity: [0, 0.05, 0.1],
      y: -20,
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1],
        opacity: {
          duration: 0.75,
          times: [0, 0.7, 1],
        },
      },
    },
    middle: {
      opacity: [0, 0.5, 1],
      y: 60,
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1],
        opacity: {
          duration: 0.75,
          times: [0, 0.7, 1],
        },
      },
    },
    bottom: {
      opacity: [0, 0.05, 0.1],
      y: 140,
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1],
        opacity: {
          duration: 0.75,
          times: [0, 0.7, 1],
        },
      },
    },
    exit: {
      opacity: [0.1, 0.05, 0],
      y: -160,
      transition: {
        duration: 0.75,
        ease: [0.4, 0, 0.2, 1],
        opacity: {
          duration: 0.75,
          times: [0, 0.7, 1],
        },
      },
    },
  };

  return (
    <motion.div
      className={`flex gap-6 items-center absolute left-0 ${className}`}
      variants={variants}
      initial={
        position === "bottom"
          ? {
              opacity: 0,
              y: 160,
            }
          : false
      }
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
      <motion.span className="text-5xl font-semibold leading-[56px] tracking-[-2px] text-[#91FFFF]">
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
