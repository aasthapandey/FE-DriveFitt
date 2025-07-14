"use client";
import { ScrollingCardSection as ScrollingCardSectionType } from "@/types/staticPages";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface ScrollingCardSectionProps {
  data: ScrollingCardSectionType;
  isMobile?: boolean;
}

const ScrollingCardSection = ({
  data,
  isMobile,
}: ScrollingCardSectionProps) => {
  const { title, description, iconImage, cardSection } = data;
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.8,
      }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => sectionObserver.disconnect();
  }, [isMobile]);

  const handleAccordionToggle = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? -1 : index);
    } else {
      setActiveIndex(index);
    }
  };

  const renderCardImage = (
    <div
      key={activeIndex}
      className={`rounded-[20px] md:rounded-[40px] p-[2px] h-[396px] md:h-[598px] ${
        isMobile && isInView ? "sticky top-4" : ""
      }`}
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <div
        key={`card-image-${activeIndex}`}
        className="rounded-[20px] md:rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center transition-all duration-500 ease-in-out"
        style={{
          background: `linear-gradient(180.09deg, rgba(13, 13, 13, 0) 50%, #0D0D0D 99.92%), url(${
            isMobile && cardSection[activeIndex]?.mobileImage
              ? cardSection[activeIndex].mobileImage
              : cardSection[activeIndex]?.backgroundImage
          })`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "100% 100%",
        }}
      />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="md:px-[120px] px-6 flex flex-col gap-5 md:gap-8"
    >
      <TitleDescription title={title} description={description} />
      <div className="flex justify-between gap-[68px]">
        <div className="flex flex-col md:w-[584px] w-full h-auto md:h-full justify-center border-t border-[#FFFFFF29] md:border-t-0">
          {cardSection.map((card, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                background: `${
                  activeIndex === idx && !isMobile
                    ? "linear-gradient(90deg, #1E1E1E 0%, #0D0D0D 100%)"
                    : ""
                }`,
              }}
              className="flex flex-col cursor-pointer border-b border-[#FFFFFF29]"
              onMouseEnter={() => !isMobile && setActiveIndex(idx)}
              onClick={() => isMobile && handleAccordionToggle(idx)}
            >
              <div className="flex items-center justify-between py-6 md:px-10 md:pt-8 md:pb-6">
                <h3 className="text-base md:text-[32px] font-semibold md:font-medium leading-6 md:leading-10 tracking-[-1px]">
                  {card.subTitle}
                </h3>
                {isMobile && (
                  <Image
                    src={
                      activeIndex === idx
                        ? "https://da8nru77lsio9.cloudfront.net/images/accordian-up-arrow.svg"
                        : "https://da8nru77lsio9.cloudfront.net/images/accordian-down-arrow.svg"
                    }
                    alt={activeIndex === idx ? "collapse" : "expand"}
                    width={24}
                    height={24}
                    className="transition-transform duration-200"
                  />
                )}
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === idx
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-4 md:gap-3 pb-6 md:px-10">
                  {card.list.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-start gap-[14px] md:gap-[26px]"
                    >
                      <Image
                        src={iconImage}
                        alt="check"
                        width={23.33}
                        height={23.33}
                        className="mt-1 size-5 md:size-[23.33px]"
                      />
                      <span className="text-xs font-light md:text-base tracking-[-1%]">
                        {item}
                      </span>
                    </div>
                  ))}
                  {card.extraTagLabel && !isMobile && (
                    <span className="text-right text-sm text-[#808080] mt-2 italic">
                      {card.extraTagLabel}
                    </span>
                  )}
                  {isMobile && activeIndex === idx && renderCardImage}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isMobile ? null : <div className="w-[549px]">{renderCardImage}</div>}
      </div>
    </section>
  );
};

export default ScrollingCardSection;
