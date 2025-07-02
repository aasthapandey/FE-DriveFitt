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
      <div className="grid grid-cols-1 md:grid-cols-2">
        {cardList.map((card, index) => (
          <div
            key={index}
            className={`${
              (card.title === "Passion for Sport & Health" ||
                card.title === "Investment Capacity") &&
              !isMobile
                ? "border-b border-[#333333]"
                : ""
            } ${
              (card.title === "Passion for Sport & Health" ||
                card.title === "Operational Experience") &&
              !isMobile
                ? "border-r border-[#333333]"
                : ""
            } p-4 md:px-12 md:py-[60px] flex flex-col items-center gap-3`}
          >
            <div className="w-12 h-12 relative mb-2 md:mb-7">
              <div
                className="absolute inset-0 rounded-full w-10 h-10"
                style={{
                  boxShadow: "0px 7.2px 14.4px 0px #00DBDC33",
                }}
              >
                <div className="w-full h-full flex items-center justify-center bg-[#00DBDC] rounded-full">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={24}
                    height={24}
                    className="max-w-6 max-h-6 w-auto h-auto"
                  />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white">{card.title}</h3>
            <p className="text-gray-300 text-center">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoLookingForSection;
