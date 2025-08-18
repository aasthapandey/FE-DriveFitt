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
      <TitleDescription title={title} />

      <div className="mt-8 md:mt-16">
        {/* Desktop Cards Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16 justify-items-center px-[120px] max-w-[1440px] mx-auto">
          {coaches.map((coach) => (
            <div
              key={coach.id}
              className="rounded-[40px] p-0 flex flex-col text-center overflow-hidden relative"
              style={{
                width: "373px",
                height: "568px",
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

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div
            className="flex gap-4 overflow-x-auto px-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {coaches.map((coach, index) => (
              <div
                key={coach.id}
                className="rounded-[20px] p-0 flex flex-col text-center overflow-hidden relative flex-shrink-0"
                style={{
                  width: "200px",
                  height: "304px",
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
                <div className="p-4 flex flex-col justify-end absolute bottom-0 left-0 right-0">
                  {/* Coach Name */}
                  <h3
                    className="text-white mb-1"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      lineHeight: "20px",
                      letterSpacing: "0px",
                    }}
                  >
                    {coach.name}
                  </h3>

                  {/* Coach Description */}
                  <p
                    className="text-gray-300"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "22px",
                      letterSpacing: "0px",
                    }}
                  >
                    {coach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* See More Button */}
        <div className="flex justify-center px-6 md:px-[120px]">
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
