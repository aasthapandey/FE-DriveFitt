"use client";
import { ScrollingCardSection as ScrollingCardSectionType } from "@/types/staticPages";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";
import { useState } from "react";

interface ScrollingCardSectionProps {
  data: ScrollingCardSectionType;
  isMobile?: boolean;
}

const ScrollingCardSection = ({ data }: ScrollingCardSectionProps) => {
  const { title, description, iconImage, cardSection } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCardImage = (
    <div
      className="rounded-[20px] md:rounded-[40px] p-[2px] h-[396px] md:h-[598px]"
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <div
        className="rounded-[20px] md:rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center p-6 md:p-10"
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
    <section className="md:px-[120px] px-4 flex flex-col gap-8">
      <TitleDescription title={title} description={description} />
      <div className="flex justify-between gap-[68px]">
        <div className="flex flex-col w-[584px] h-full justify-center">
          {cardSection.map((card, idx) => (
            <div
              key={idx}
              style={{
                background: `${
                  activeIndex === idx
                    ? "linear-gradient(90deg, #1E1E1E 0%, #0D0D0D 100%)"
                    : ""
                }`,
              }}
              className="flex flex-col gap-6 cursor-pointer px-10 pt-8 pb-6 border-b border-[#FFFFFF29]"
              onClick={() => setActiveIndex(idx)}
            >
              <h3 className="text-base md:text-[32px] font-semibold md:font-medium leading-6 md:leading-10 tracking-[-1px]">
                {card.subTitle}
              </h3>
              {activeIndex === idx && (
                <div className="flex flex-col gap-3">
                  {card.list.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-4">
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
                  {card.extraTagLabel && (
                    <span className="text-right text-sm text-[#808080] mt-2 italic">
                      {card.extraTagLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-[549px]">{renderCardImage}</div>
      </div>
    </section>
  );
};

export default ScrollingCardSection;
