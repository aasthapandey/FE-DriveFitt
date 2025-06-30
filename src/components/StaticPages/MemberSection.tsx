"use client";
import { useRef, useState } from "react";
import { MemberSectionProps } from "@/types/staticPages";
import MemberCard from "@/components/StaticPages/MemberCard";
import Image from "next/image";
import TitleDescription from "@/components/common/TitleDescription";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MemberSection = ({
  data,
  isMobile,
}: {
  data: MemberSectionProps;
  isMobile?: boolean;
}) => {
  const { title, description, memberList } = data;
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    arrows: false,
    swipe: isMobile,
    draggable: isMobile,
    touchMove: isMobile,
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
          draggable: true,
          touchMove: true,
        },
      },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  // Calculate position and width for highlighting the active card
  const getActiveCardHighlight = () => {
    if (isMobile) return { width: 0, left: 0 }; // No highlight on mobile

    const cardWidth = 100 / 3; // Each card takes 33.33% width in desktop (3 cards view)
    const activeCardIndex = currentSlide; // Currently focused card index

    return {
      width: `${cardWidth}%`,
      left: `${activeCardIndex * cardWidth}%`,
    };
  };

  const highlightStyle = getActiveCardHighlight();

  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5 overflow-hidden">
      <TitleDescription title={title || ""} description={description || ""} />

      <div className="member-carousel">
        <Slider ref={sliderRef} {...sliderSettings}>
          {memberList.map((member) => (
            <div key={member.title} className="px-[10px] md:px-5">
              <MemberCard data={member} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex items-center mt-8">
        <div className="relative w-full max-w-[1200px] h-[1px] bg-[#1C1C1E] mb-2">
          {/* White highlight below active card */}
          <div
            className="hidden md:block absolute top-0 h-[2px] bg-white transition-all duration-500 ease-in-out"
            style={{
              width: highlightStyle.width,
              left: highlightStyle.left,
            }}
          />
        </div>
        <div className="h-16 p-2 rounded-[53.3px] bg-[#1B19444D] hidden md:flex gap-4">
          <button
            onClick={handlePrevious}
            className="bg-[#1C1C1E] rounded-full p-4 hover:bg-[#2C2C2E] transition-colors"
          >
            <Image
              src="/images/arrow-left.svg"
              alt="Previous"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={handleNext}
            className="bg-[#1C1C1E] rounded-full p-4 hover:bg-[#2C2C2E] transition-colors"
          >
            <Image
              src="/images/arrow-right.svg"
              alt="Next"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemberSection;
