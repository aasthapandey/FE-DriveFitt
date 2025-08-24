"use client";
import Image from "next/image";
import { useState } from "react";

interface PricingPlan {
  title: string;
  subtitle?: string;
  discountedPrice: string;
  originalPrice: string;
  discountPercentage: string;
  buttonText: string;
  seatsLeft: string;
}

interface PricingPlansProps {
  plans: PricingPlan[];
  className?: string;
  isMobile?: boolean;
}

const PricingPlans = ({ plans, className, isMobile }: PricingPlansProps) => {
  const [activePlanIndex, setActivePlanIndex] = useState(0);

  const handlePlanSwitch = (index: number) => {
    setActivePlanIndex(index);
  };

  if (isMobile) {
    return (
      <section className={`px-6 ${className}`}>
        <div className="flex flex-col items-center w-full max-w-[1200px] mx-auto">
          {/* Active Plan Card */}
          <div className="w-full">
            <div
              className="w-full rounded-[20px] p-[2px]"
              style={{
                background:
                  "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
              }}
            >
              <div
                className="w-full rounded-[20px] flex flex-col items-center justify-center p-6"
                style={{
                  background:
                    "linear-gradient(180deg, #111111 36.81%, #001011 94.04%)",
                }}
              >
                {/* Plan Selection Tabs - Inside the card */}
                <div className="flex w-full mb-6">
                  <div className="flex w-full bg-[#111111] rounded-[12px] border border-[#00DBDC] overflow-hidden">
                    {plans.map((plan, index) => (
                      <button
                        key={index}
                        onClick={() => handlePlanSwitch(index)}
                        className={`flex-1 py-3 px-4 transition-all duration-200 font-medium text-base leading-5 tracking-[0px] text-center ${
                          activePlanIndex === index
                            ? "bg-[#00DBDC] text-[#111111]"
                            : "bg-transparent text-[#00DBDC] hover:bg-[#00DBDC]/10"
                        }`}
                      >
                        {plan.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center text-center w-full">
                  {/* Discounted Price */}
                  <div className="text-[40px] font-semibold leading-[100%] tracking-[0px] text-center text-[#00DBDC] mb-5">
                    {plans[activePlanIndex].discountedPrice}
                  </div>

                  {/* Original Price Line */}
                  <div className="flex items-center justify-center gap-3 mb-[47px]">
                    <span className="text-base font-normal leading-[100%] tracking-[0px] text-center text-[#6A6A6A]">
                      Original price:{" "}
                      <span className="line-through">
                        {plans[activePlanIndex].originalPrice}
                      </span>
                    </span>
                    <Image
                      src="/images/plans/discount-tag.svg"
                      alt="Discount"
                      width={104}
                      height={36}
                      className="w-16 h-6"
                    />
                  </div>

                  {/* Divider Line */}
                  <div className="w-full border-t border-[#333333] mb-[33px]" />

                  {/* Limited Period Text */}
                  <p className="text-sm font-light leading-5 tracking-[0px] text-center text-white mb-4">
                    Limited period offer for first{" "}
                    <span className="font-bold text-sm leading-5 tracking-[0px] text-center text-white">
                      100 members
                    </span>
                  </p>

                  {/* Button */}
                  <button className="w-full mx-6 h-12 rounded-lg bg-[#00DBDC] py-[10px] mb-4">
                    <span className="text-base font-medium leading-[100%] tracking-[-5%] text-[#0D0D0D]">
                      {plans[activePlanIndex].buttonText}
                    </span>
                  </button>

                  {/* Seats Left */}
                  <div className="flex items-center gap-2 mb-[16px]">
                    <Image
                      src="/images/plans/clock.svg"
                      alt="Clock"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-light leading-5 tracking-[0px] text-center text-[#0BFFB6]">
                      {plans[activePlanIndex].seatsLeft}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop/Tablet Layout (existing code)
  return (
    <section
      className={`flex flex-col items-center gap-6 md:gap-10 lg:gap-[40px] px-4 md:px-6 lg:px-8 md:-mt-[95px] ${className}`}
    >
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-[40px] w-full max-w-[1200px]">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="w-full lg:w-[580px] h-auto min-h-[400px] md:min-h-[500px] lg:h-[554px] rounded-[20px] md:rounded-[30px] lg:rounded-[40px] p-[2px]"
            style={{
              background:
                "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
            }}
          >
            <div
              className="w-full h-full rounded-[20px] md:rounded-[30px] lg:rounded-[40px] flex flex-col items-center justify-center p-4 md:p-6 lg:p-10"
              style={{
                background:
                  "linear-gradient(180deg, #111111 36.81%, #001011 94.04%)",
              }}
            >
              <div className="flex flex-col items-center text-center w-full">
                <h3
                  className={`text-lg md:text-xl lg:text-2xl font-light leading-[100%] tracking-[0px] text-white mb-2 md:mb-3 ${
                    plan.subtitle ? "lg:mb-3" : "lg:mb-[65px]"
                  }`}
                >
                  {plan.title}
                </h3>

                {plan.subtitle && (
                  <div className="bg-[#1E1E1E] rounded px-2 md:px-3 py-1 mb-4 md:mb-6">
                    <span className="text-xs md:text-sm font-normal leading-4 md:leading-5 tracking-[0px] text-center text-white">
                      {plan.subtitle}
                    </span>
                  </div>
                )}

                <div className="text-3xl md:text-4xl lg:text-[60px] font-semibold leading-[100%] tracking-[0px] text-center text-[#00DBDC] mb-4 md:mb-6">
                  {plan.discountedPrice}
                </div>

                <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8 lg:mb-10">
                  <span className="text-lg md:text-xl lg:text-2xl font-normal leading-[100%] tracking-[0px] text-center text-[#6A6A6A]">
                    Original price:{" "}
                    <span className="line-through">{plan.originalPrice}</span>
                  </span>
                  <Image
                    src="/images/plans/discount-tag.svg"
                    alt="Discount"
                    width={104}
                    height={36}
                    className="w-16 md:w-20 lg:w-[104px] h-6 md:h-7 lg:h-[36px]"
                  />
                </div>

                <div className="w-full border-t border-[#333333] mb-6 md:mb-8 lg:mb-10" />

                <p className="text-sm md:text-base font-light leading-4 md:leading-5 tracking-[0px] text-center text-white mb-3 md:mb-4 px-2">
                  Limited period offer for first{" "}
                  <span className="font-bold text-sm md:text-base leading-4 md:leading-5 tracking-[0px] text-center text-white">
                    100 members
                  </span>
                </p>

                <button className="w-full h-12 md:h-14 lg:h-[56px] rounded-lg bg-[#00DBDC] px-4 md:px-[60px] lg:px-[60px] py-3 md:py-4 mb-3 md:mb-4">
                  <span className="text-sm md:text-lg lg:text-xl font-medium leading-[100%] tracking-[-5%] text-[#0D0D0D]">
                    {plan.buttonText}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <Image
                    src="/images/plans/clock.svg"
                    alt="Clock"
                    width={20}
                    height={20}
                    className="w-4 md:w-5 h-4 md:h-5"
                  />
                  <span className="text-sm md:text-base font-light leading-4 md:leading-5 tracking-[0px] text-center text-[#0BFFB6]">
                    {plan.seatsLeft}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlans;
