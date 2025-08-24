"use client";
import { useState } from "react";
import { SignatureClassesSection as SignatureClassesSectionType } from "@/types/staticPages";
import Image from "next/image";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import TitleDescription from "../common/TitleDescription";

interface SignatureClassesSectionProps {
  data: SignatureClassesSectionType;
  isMobile?: boolean;
}

const SignatureClassesSection = ({
  data,
  isMobile,
}: SignatureClassesSectionProps) => {
  const { title, cardList, cardList2 } = data;
  const [scrollPosition, setScrollPosition] = useState(0);

  const handlePrevious = () => {
    setScrollPosition((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    const maxScrollPosition = Math.max(0, cardList.length - 2); // Show 2 cards at a time
    setScrollPosition((prev) => Math.min(maxScrollPosition, prev + 1));
  };

  const maxScrollPosition = Math.max(0, cardList.length - 2);
  const canGoPrevious = scrollPosition > 0;
  const canGoNext = scrollPosition < maxScrollPosition;

  return (
    <section className="md:pl-[120px] px-6 flex flex-col ">
      <ScrollAnimation delay={0.2} direction="up">
        <TitleDescription title={title} />
      </ScrollAnimation>
      <ScrollAnimation delay={0.3} direction="up">
        <div className="flex flex-col items-center gap-9 mt-[4px] md:-mt-[14px]">
          {!isMobile && (
            <div className="flex items-center gap-8 md:mb-[52px] ">
              <button
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                  canGoPrevious
                    ? "bg-[#00DBDC] cursor-pointer hover:bg-[#00B8B9]"
                    : "bg-[#333333] cursor-not-allowed opacity-50"
                }`}
              >
                <Image
                  src="/images/group-classes/left-arrow.svg"
                  alt="Previous"
                  width={56}
                  height={56}
                  className={` ${!canGoPrevious ? "opacity-50" : ""}`}
                />
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                  canGoNext
                    ? "bg-[#00DBDC] cursor-pointer hover:bg-[#00B8B9]"
                    : "bg-[#333333] cursor-not-allowed opacity-50"
                }`}
              >
                <Image
                  src="/images/group-classes/right-arrow.png"
                  alt="Next"
                  width={56}
                  height={56}
                  className={!canGoNext ? "opacity-50" : ""}
                />
              </button>
            </div>
          )}
        </div>
      </ScrollAnimation>

      <ScrollAnimation delay={0.3} direction="up">
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {[...cardList, ...cardList2].map((card, index) => (
              <div
                key={index}
                className="relative w-[174px] h-[174px] rounded-[12px] overflow-hidden"
                style={{
                  backgroundImage: `url(${card.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-medium text-sm leading-5 tracking-[0px]">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="relative overflow-hidden">
              <div
                className="flex gap-10 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${scrollPosition * 520}px)`,
                }}
              >
                {cardList.map((card, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 rounded-[40px] overflow-hidden"
                    style={{
                      width: "480px",
                      height: "clamp(400px, 50vw, 480px)",
                      backgroundImage: `url(${card.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute bottom-8 left-8 flex flex-col gap-4">
                      <h3 className="text-white font-semibold text-[28px] leading-8 tracking-[-1px]">
                        {card.title}
                      </h3>
                      <p className="text-white font-light text-base leading-6 tracking-[-0.32px] max-w-[400px]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div
                className="flex gap-10 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${scrollPosition * 520}px)`,
                }}
              >
                {cardList2.map((card, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 rounded-[40px] overflow-hidden"
                    style={{
                      width: "480px",
                      height: "clamp(400px, 50vw, 480px)",
                      backgroundImage: `url(${card.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute bottom-8 left-8 flex flex-col gap-4">
                      <h3 className="text-white font-semibold text-[28px] leading-8 tracking-[-1px]">
                        {card.title}
                      </h3>
                      <p className="text-white font-light text-base leading-6 tracking-[-0.32px] max-w-[400px]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </ScrollAnimation>
    </section>
  );
};

export default SignatureClassesSection;
