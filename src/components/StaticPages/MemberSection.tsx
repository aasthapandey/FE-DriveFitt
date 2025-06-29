"use client";
import { useState } from "react";
import { MemberSectionProps } from "@/types/staticPages";
import MemberCard from "@/components/StaticPages/MemberCard";
import Image from "next/image";
import TitleDescription from "@/components/common/TitleDescription";

const MemberSection = ({
  data,
  isMobile,
}: {
  data: MemberSectionProps;
  isMobile?: boolean;
}) => {
  const { title, description, memberList } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = 3;

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, memberList.length - itemsPerPage)
        : Math.max(0, prevIndex - itemsPerPage)
    );
    setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition duration
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= memberList.length
        ? 0
        : prevIndex + itemsPerPage
    );
    setTimeout(() => setIsAnimating(false), 500); // Match this with CSS transition duration
  };

  let widthOfCards = isMobile ? 66.6 : 33.3;

  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5 overflow-hidden">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            width: `${(memberList.length / itemsPerPage) * 100}%`,
          }}
        >
          {memberList.map((member) => (
            <div
              key={member.title}
              className="flex-shrink-0 "
              style={{ width: `${widthOfCards}%` }}
            >
              <div className="px-[10px] md:px-5">
                <MemberCard data={member} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center mt-8">
        <div className="w-full max-w-[1200px] h-[1px] bg-[#1C1C1E] mb-8"></div>
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={isAnimating}
            className="bg-[#1C1C1E] rounded-full p-4 hover:bg-[#2C2C2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isAnimating}
            className="bg-[#1C1C1E] rounded-full p-4 hover:bg-[#2C2C2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
