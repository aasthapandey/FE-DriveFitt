"use client";
import { useState } from "react";
import { MemberSectionProps } from "@/types/staticPages";
import MemberCard from "@/components/StaticPages/MemberCard";
import Image from "next/image";

const MemberSection = ({ data }: { data: MemberSectionProps }) => {
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

  return (
    <section className="px-[120px] flex flex-col gap-4 relative !overflow-hidden">
      <h2 className="text-5xl font-semibold leading-[56px] tracking-[-2px] text-center">
        {title}
      </h2>
      {description && (
        <p className="text-base font-light leading-5 tracking-[-1%] text-[#8A8A8A] text-center max-w-[600px] mx-auto mb-[52px]">
          {description}
        </p>
      )}
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
              className="flex-shrink-0"
              style={{ width: `${100 / memberList.length}%` }}
            >
              <div className="px-5">
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
