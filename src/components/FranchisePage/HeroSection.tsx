import { FranchiseHero } from "@/types/franchisePage";
import Image from "next/image";

interface HeroSectionProps {
  data: FranchiseHero;
  pageName: string;
  isMobile?: boolean;
}

const HeroSection = ({ data, isMobile }: HeroSectionProps) => {
  const { subTitle, title, description, roiTag, roiIcon, btnPrimaryText } =
    data;
  return (
    <div className="min-h-[500px] md:min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Ecosystem Tag */}
          <div
            className="bg-[#0D2223] border items-center border-[#003434] rounded-full px-4 py-2 mb-2 flex gap-1"
            style={{ boxShadow: "0px 4px 10px 0px #00DBDC1A" }}
          >
            <Image
              src="/images/flash-on.svg"
              alt="ROI"
              width={24}
              height={24}
              className="mt-2"
            />
            <p className="text-primary text-sm md:text-base">{subTitle}</p>
          </div>

          {/* Main Title */}
          <h1 className="text-[40px] md:text-[68px] font-light text-white flex tracking-[-2px] leading-[78px]">
            <span className="italic font-bold ">DRIVE&nbsp;</span>
            <span className="text-[#00DBDC] italic font-bold leading-[78px]">
              FITT&nbsp;&nbsp;
            </span>
            <span className="text-white">{title}</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl tracking-[2%] text-white max-w-2xl font-light mb-4">
            {description}
          </p>

          {/* ROI Tag */}
          <div className="flex items-center gap-2 text-[#00DBDC] mb-4">
            <Image
              src={roiIcon}
              alt="ROI"
              width={24}
              height={24}
              className="text-primary"
            />
            <span className="text-primary text-sm md:text-base">{roiTag}</span>
          </div>

          {/* CTA Button */}
          <button className="bg-[#00DBDC] text-[#0D0D0D] px-6 py-3 md:px-14 md:py-4  rounded-lg font-medium leading-[100%] tracking-[-5%] text-base md:text-xl">
            {btnPrimaryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
