"use client";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import { GallerySectionProps } from "@/types/staticPages";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BannerCTA2 = ({
  data,
  isMobile,
}: {
  data: GallerySectionProps;
  isMobile?: boolean;
}) => {
  const {
    title,
    description,
    btnLabel,
    desktopImage,
    mobileImage,
    mobileImageUp = false,
  } = data;

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const handleButtonClick = () => {
    window.location.href = "/contact-us";
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-[15px] md:!mb-[-40px] md:mt-[-100px]"
    >
      {!isMobile && <div className="h-10 w-full bg-transparent"></div>}
      <motion.div
        className="h-[540px] md:h-[492px] w-full pt-10 md:pt-[120px] md:pb-[100px] md:pl-[120px]"
        style={{ opacity, scale }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full">
          <motion.div
            className={`flex-1 md:order-1 px-6 ${
              isMobile && mobileImageUp ? "order-2" : ""
            }`}
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-full flex flex-col text-center justify-center items-center md:text-start md:justify-start md:items-start gap-3 md:gap-4 relative z-10">
              <motion.h2
                className="w-full text-center md:text-left font-semibold text-[24px] leading-[28px] md:text-[48px] md:leading-[56px] tracking-[-1px] md:tracking-[-2px] text-white"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {title}
              </motion.h2>
              <motion.p
                className="font-normal w-full text-center md:text-left md:w-[593px] text-sm leading-5 tracking-[0%] text-[#8A8A8A] md:text-base md:tracking-[-1%]"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {description}
              </motion.p>
              <motion.button
                onClick={() => handleButtonClick()}
                className={`bg-[#00DBDC] w-full max-w-[255px] h-[43px] md:h-[52px] text-base leading-5 tracking-[5%] py-3 md:py-4 text-[#0D0D0D] rounded-[4px] md:rounded-lg mt-4 md:mt-6 hover:bg-transparent border border-transparent hover:border-[#00DBDC] hover:text-[#00DBDC] transition-all duration-200 font-medium`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {btnLabel}
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            className={`flex-1 md:max-w-[656px] md:max-h-[564px] relative md:order-2 -md:mr-[120px] ${
              isMobile && mobileImageUp ? "order-first" : "mt-8"
            } md:mt-0`}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ y: y1 }}
          >
            <div className="h-[320px] md:h-[564px] w-full relative">
              <Image
                src={`${isMobile ? mobileImage : desktopImage}`}
                alt="gallery-1"
                fill
                className="object-cover rounded-lg md:rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default BannerCTA2;
