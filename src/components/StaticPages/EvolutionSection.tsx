"use client";
import { useState } from "react";
import TitleDescription from "@/components/common/TitleDescription";
import { EvolutionSectionProps, EvolutionItem } from "@/types/staticPages";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EvolutionSection = ({ data }: { data: EvolutionSectionProps }) => {
  const { title, evolutionList } = data;
  const [activeBackground, setActiveBackground] = useState<EvolutionItem>(
    evolutionList[0]
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => {
      const roundedIndex = Math.round(index);
      const safeIndex = Math.max(
        0,
        Math.min(roundedIndex, evolutionList.length - 1)
      );

      if (evolutionList[safeIndex]) {
        setActiveBackground(evolutionList[safeIndex]);
      } else {
        setActiveBackground(evolutionList[0]);
      }
    },
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-colors duration-300" />
    ),
    dotsClass: "slick-dots custom-dots",
  };

  const backgroundImageUrl =
    activeBackground?.backgroundImage ||
    evolutionList[0]?.backgroundImage ||
    "";

  return (
    <section className="flex flex-col gap-5">
      <TitleDescription title={title || ""} />
      <div
        className="h-[208px] md:h-[730px] w-full flex flex-col justify-end evolution-background"
        style={{
          background: `linear-gradient(179.2deg, rgba(0, 0, 0, 0) 0.87%, rgba(0, 0, 0, 0.2) 54.05%, #0D0D0D 99.5%), url(${backgroundImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundAttachment: "local",
        }}
      >
        {/* Desktop Hover View */}
        <div className="hidden md:flex justify-between h-fit items-start w-full gap-10 md:px-[120px] pl-6 py-4 md:py-[60px]">
          {evolutionList.map((evo, idx) => {
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveBackground(evo)}
                className={`${
                  activeBackground.title === evo.title
                    ? "bg-white text-[#1C1C1C]"
                    : "bg-transparent text-white"
                } flex flex-col gap-4 p-8 cursor-pointer h-full w-full md:w-[374px] border-t-[2px] border-white transition-colors duration-300`}
              >
                <h3 className="text-xl md:text-[32px] font-semibold leading-6 md:leading-9 tracking-[-1%]">
                  {evo.title}
                </h3>
                <p className="text-sm tracking-[-1%] font-light md:text-base leading-5 md:tracking-[-2%]">
                  {evo.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile Carousel View */}
      <div className="block md:hidden mt-[-70px] pl-4 evolutionCarousel">
        <Slider {...sliderSettings}>
          {evolutionList.map((evo, idx) => (
            <div key={idx} className="!w-full h-[125px] pl-4">
              <div className="bg-white text-[#1C1C1C] flex flex-col justify-center gap-3 px-6 w-full h-full">
                <h3 className="text-xl font-semibold leading-6 tracking-[-1%]">
                  {evo.title}
                </h3>
                <p className="text-sm tracking-[-1%] font-light leading-5">
                  {evo.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default EvolutionSection;
