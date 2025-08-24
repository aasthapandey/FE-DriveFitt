"use client";
import Image from "next/image";
import ScrollAnimation from "@/components/common/ScrollAnimation";

interface IncludedPlansProps {
  className?: string;
  isMobile?: boolean;
}

const IncludedPlans = ({ className, isMobile }: IncludedPlansProps) => {
  const includedItems = [
    "30 Cricket Sessions",
    "8 Pilates Sessions",
    "6 Run Studio Sessions",
    "6 Recovery Classes",
    "4 Physio Sessions",
    "Unlimited Group Classes (Spinning, etc.)",
    "Unlimited Small Group Training",
    "Included: Fitness Induction + Events/Workshops/Outdoor Runs/Bootcamps",
  ];

  if (isMobile) {
    return (
      <section className={`px-6 ${className}`}>
        <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto">
          <ScrollAnimation delay={0.2} direction="up">
            <div
              className="w-full rounded-[20px] p-6 border-2"
              style={{
                borderColor: "#333333",
                background:
                  "linear-gradient(180deg, #111111 36.81%, #001011 94.04%)",
              }}
            >
              <h2 className="font-semibold text-xl leading-6 tracking-[0px] text-white mb-4">
                Included in all plans
              </h2>

              <div className="flex flex-col gap-3">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Image
                      src="/images/plans/check-circle.svg"
                      alt="Check"
                      width={24}
                      height={24}
                      className="w-6 h-6 flex-shrink-0 mt-0.5"
                    />
                    <span className="font-light text-base leading-5 tracking-[0px] text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    );
  }

  return (
    <section className={`px-[60px] ${className}`}>
      <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto">
        <ScrollAnimation delay={0.2} direction="up">
          <div
            className="w-full rounded-[20px] p-[60px] border-2"
            style={{
              borderColor: "#333333",
              background:
                "linear-gradient(180deg, #111111 36.81%, #001011 94.04%)",
            }}
          >
            <h2 className="font-semibold text-[28px] leading-[28px] tracking-[0px] text-white mb-8">
              Included in all plans
            </h2>

            <div className="grid grid-cols-[auto_1fr] gap-x-[88px] gap-y-5">
              {includedItems.map((item, index) => (
                <div key={index} className="flex items-start gap-[19px]">
                  <Image
                    src="/images/plans/check-circle.svg"
                    alt="Check"
                    width={28}
                    height={28}
                    className="w-7 h-7 flex-shrink-0 mt-0.5"
                  />
                  <span className="font-light text-xl leading-7 tracking-[0px] text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default IncludedPlans;
