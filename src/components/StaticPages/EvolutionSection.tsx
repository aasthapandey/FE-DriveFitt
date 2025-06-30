"use client";
import { useState } from "react";
import TitleDescription from "@/components/common/TitleDescription";
import { EvolutionSectionProps, EvolutionItem } from "@/types/staticPages";

const EvolutionSection = ({ data }: { data: EvolutionSectionProps }) => {
  const { title, evolutionList } = data;
  const [activeBackground, setActiveBackground] = useState<EvolutionItem>(
    evolutionList[0]
  );
  return (
    <section className="flex flex-col gap-5">
      <TitleDescription title={title || ""} />
      <div
        className="h-[730px] w-full flex flex-col justify-end"
        style={{
          background: `linear-gradient(179.2deg, rgba(0, 0, 0, 0) 0.87%, rgba(0, 0, 0, 0.2) 54.05%, #0D0D0D 99.5%), url(${activeBackground.backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "local",
        }}
      >
        <div className="flex justify-between items-start w-full gap-10 md:px-[120px] px-6 py-4 md:py-[60px]">
          {evolutionList.map((evo, idx) => {
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveBackground(evo)}
                className={`${
                  activeBackground.title === evo.title
                    ? "bg-white text-[#1C1C1C]"
                    : "bg-transparent text-white"
                } flex flex-col gap-4 p-8 cursor-pointer h-[125px] md:h-[220px] w-full md:w-[374px] border-t-[2px] border-white transition-colors duration-300`}
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
    </section>
  );
};

export default EvolutionSection;
