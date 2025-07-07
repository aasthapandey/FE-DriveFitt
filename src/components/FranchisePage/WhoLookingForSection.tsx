import { CardSection } from "@/types/franchisePage";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";

interface WhatLookingForSectionProps {
  data: CardSection;
  isMobile?: boolean;
}

const WhoLookingForSection = ({
  data,
  isMobile,
}: WhatLookingForSectionProps) => {
  const { title, description, cardList } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="grid grid-cols-2">
        {cardList.map((card, index) => (
          <div
            key={index}
            className={`${
              card.title === "Passion for Sport & Health" ||
              card.title === "Investment Capacity"
                ? "border-b border-[#333333] md:px-12 pr-[10px]"
                : ""
            } ${
              card.title === "Passion for Sport & Health" ||
              card.title === "Operational Experience"
                ? "border-r border-[#333333] md:px-12 pl-[10px]"
                : ""
            } p-4 md:px-12 md:py-[60px] flex flex-col items-center gap-3 md:gap-3`}
          >
            <div className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] relative mb-3 md:mb-7">
              <div
                className="absolute inset-0 rounded-full md:w-[100px] md:h-[100px] w-[60px] h-[60px]"
                style={{
                  boxShadow: "0px 7.2px 14.4px 0px #00DBDC33",
                }}
              >
                <div className="w-full h-full flex items-center justify-center bg-[#00DBDC] rounded-full">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={60}
                    height={60}
                    className="md:max-w-[60px] md:max-h-[60px] w-auto max-w-9 max-h-9 h-auto"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-xl md:text-[32px] leading-6 tracking-[-1px] text-center md:leading-10 font-semibold text-white">
              {card.title}
            </h3>
            <p className="text-[#8A8A8A] text-xs tracking-[0px] md:text-base leading-4 md:leading-5 text-center">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoLookingForSection;
