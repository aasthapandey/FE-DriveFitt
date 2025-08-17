"use client";

import TitleDescription from "../common/TitleDescription";

interface Coach {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface MeetYourCoachesSectionProps {
  title: string;
  coaches: Coach[];
  seeMoreText?: string;
  isMobile?: boolean;
}

const MeetYourCoachesSection = ({
  title,
  coaches,
  seeMoreText = "See more",
  isMobile = false,
}: MeetYourCoachesSectionProps) => {
  const handleSeeMore = () => {
    // Handle see more functionality
    console.log("See more clicked");
  };

  return (
    <div className="w-full">
      <TitleDescription title={title} className="px-[24px] mb-8 md:mb-16" />

      <div className="px-4 md:px-[120px] max-w-[1440px] mx-auto">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16 justify-items-center">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="rounded-[40px] p-0 flex flex-col text-center overflow-hidden relative"
              style={{
                width: isMobile ? "100%" : "373px",
                height: isMobile ? "auto" : "568px",
                maxWidth: "373px",
                opacity: 1,
              }}
            >
              {/* Coach Image Container */}
              <div className="w-full h-full relative">
                {/* Image */}
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="p-6 flex flex-col justify-end absolute bottom-0 left-0 right-0">
                {/* Coach Name */}
                <h3
                  className="text-white mb-2"
                  style={{
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                  }}
                >
                  {coach.name}
                </h3>

                {/* Coach Description */}
                <p
                  className="text-gray-300"
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  {coach.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSeeMore}
            className={`bg-[#00DBDC] border border-transparent w-fit leading-[100%] tracking-[-5%] text-base text-[#0D0D0D] px-10 py-3 rounded-[4px] md:rounded-lg font-medium ${
              isMobile
                ? "h-[37px] font-medium text-sm leading-none tracking-tighter"
                : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
            } transition-all duration-200 md:px-[48px] md:h-[50px]`}
          >
            {seeMoreText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetYourCoachesSection;
