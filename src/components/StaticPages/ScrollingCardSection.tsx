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

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        threshold: 0.8,
        rootMargin: "-30% 0px -30% 0px",
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const renderCardImage = (
    <div
      className={`rounded-[20px] md:rounded-[40px] p-[2px] h-[396px] md:h-[598px] ${
        isMobile && isInView ? "sticky top-4" : ""
      }`}
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <div
        className="rounded-[20px] md:rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center p-6 md:p-10 transition-all duration-500 ease-in-out"
        style={{
          background: `linear-gradient(180.09deg, rgba(13, 13, 13, 0) 50%, #0D0D0D 99.92%), url(${cardSection[activeIndex].backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "local",
          backgroundSize: "cover",
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
              className="flex flex-col gap-6 cursor-pointer py-6 md:px-10 md:pt-8 md:pb-6 border-b border-[#FFFFFF29]"
              onMouseEnter={() => !isMobile && setActiveIndex(idx)}
            >
              <h3 className="text-base md:text-[32px] font-semibold md:font-medium leading-6 md:leading-10 tracking-[-1px]">
                {card.subTitle}
              </h3>
              {activeIndex === idx && (
                <div className="flex flex-col gap-4 md:gap-3">
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
                  {isMobile && renderCardImage}
                </div>
              )}
            </div>
          ))}
        </div>
        {isMobile ? null : <div className="w-[549px]">{renderCardImage}</div>}
      </div>
    </section>
  );
};

export default ScrollingCardSection;
