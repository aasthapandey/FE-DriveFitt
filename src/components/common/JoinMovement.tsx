"use client";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import { JoinMovementSectionProps } from "@/types/staticPages";

interface JoinMovementProps {
  data: JoinMovementSectionProps;
}

const JoinMovement = ({ data }: JoinMovementProps) => {
  const handleBookTrial = () => {
    window.location.href = data.buttonLink || "/coming-soon";
  };

  return (
    <section className="md:px-[120px] px-6 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        {/* Left Section - Text Content */}
        <ScrollAnimation delay={0.2} direction="left">
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                {data.title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-[500px] lg:max-w-[600px]">
                {data.description}
              </p>
            </div>

            <ScrollAnimation delay={0.4} direction="up">
              <button
                onClick={handleBookTrial}
                className="bg-[#00DBDC] hover:bg-[#00B8B9] transition-colors duration-200 text-white font-semibold px-8 md:px-12 py-4 md:py-5 rounded-lg md:rounded-xl text-lg md:text-xl leading-none tracking-tight"
              >
                {data.buttonText}
              </button>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>

        {/* Right Section - Image */}
        <ScrollAnimation delay={0.6} direction="right">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] aspect-[4/5] md:aspect-[3/4]">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl md:rounded-3xl overflow-hidden relative">
                {/* Placeholder for the woman's image */}
                <div className="w-full h-full bg-gradient-to-br from-red-900/20 to-red-800/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg
                      className="w-16 h-16 md:w-20 md:h-20 text-white/60"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Sweat effect overlay */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-100"></div>
                <div className="absolute top-12 right-6 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default JoinMovement;
