"use client";
import Image from "next/image";

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
}

const PricingPlans = ({ plans, className }: PricingPlansProps) => {
  return (
    <section
      className={`flex flex-col items-center gap-10 md:gap-[40px] md:-mt-[95px] ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-[40px] w-full max-w-[1200px]">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="w-full md:w-[580px] h-[554px] rounded-[20px] md:rounded-[40px] p-[2px]"
            style={{
              background:
                "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
            }}
          >
            <div
              className="w-full h-full rounded-[20px] md:rounded-[40px] flex flex-col items-center justify-center p-6 md:p-10"
              style={{
                background:
                  "linear-gradient(180deg, #111111 36.81%, #001011 94.04%)",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <h3
                  className={`text-2xl font-light leading-[100%] tracking-[0px] text-white ${
                    plan.subtitle ? "md:mb-3" : "md:mb-[65px]"
                  }`}
                >
                  {plan.title}
                </h3>

                {plan.subtitle && (
                  <div className="bg-[#1E1E1E] rounded px-3 py-1 mb-6">
                    <span className="text-sm font-normal leading-5 tracking-[0px] text-center text-white">
                      {plan.subtitle}
                    </span>
                  </div>
                )}

                <div className="text-[60px] font-semibold leading-[100%] tracking-[0px] text-center text-[#00DBDC] mb-6">
                  {plan.discountedPrice}
                </div>

                <div className="flex items-center justify-center gap-3 mb-10">
                  <span className="text-2xl font-normal leading-[100%] tracking-[0px] text-center text-[#6A6A6A] line-through">
                    {plan.originalPrice}
                  </span>
                  <Image
                    src="/images/plans/discount-tag.svg"
                    alt="Discount"
                    width={104}
                    height={36}
                    className="w-[104px] h-[36px]"
                  />
                </div>

                <div className="w-full border-t border-[#333333] mb-10" />

                <p className="text-base font-light leading-5 tracking-[0px] text-center text-white mb-4">
                  Limited period offer for first{" "}
                  <span className="font-bold text-base leading-5 tracking-[0px] text-center text-white">
                    100 members
                  </span>
                </p>

                <button className="w-[460px] h-[56px] rounded-lg bg-[#00DBDC] px-12 py-4 mb-4">
                  <span className="text-xl font-medium leading-[100%] tracking-[-5%] text-[#0D0D0D]">
                    {plan.buttonText}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <Image
                    src="/images/plans/clock.svg"
                    alt="Clock"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span className="text-base font-light leading-5 tracking-[0px] text-center text-[#0BFFB6]">
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
