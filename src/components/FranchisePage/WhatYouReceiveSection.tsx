import { ImageCardSection } from "@/types/franchisePage";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";

interface WhatYouReceiveSectionProps {
  data: ImageCardSection;
  isMobile?: boolean;
}

const WhatYouReceiveSection = ({
  data,
  isMobile,
}: WhatYouReceiveSectionProps) => {
  const { title, description, cardList, image } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="flex gap-[60px] md:flex-row flex-col w-full items-center justify-between">
        <div className="w-[1/2]">
          <div
            className="rounded-[20px] md:rounded-[40px] p-[2px] md:h-[760px] h-[450px]"
            style={{
              background:
                "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
            }}
          >
            <div
              className="rounded-[20px] md:rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-end"
              style={{
                background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
              }}
            >
              <Image
                src={image}
                alt={title || ""}
                width={563}
                height={760}
                className="md:w-[563px] md:h-[760px] h-[450px] w-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          {cardList.map((card, index) => {
            return (
              <div key={index} className="flex gap-5 md:gap-10 min-h-full">
                <div className="min-h-full flex items-center justify-center">
                  <div className="w-12 h-12 relative">
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
                </div>
                <div
                  className={`${
                    card.title === "Ongoing growth support" ? "border-b-0" : ""
                  } flex flex-col gap-3 py-5 md:py-10 items-start justify-center border-b border-[#333333]`}
                >
                  <div className="font-semibold text-[32px] leading-10 tracking-[-1px]">
                    {card.title}
                  </div>
                  <div className="font-light text-sm leading-5">
                    {card.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouReceiveSection;
