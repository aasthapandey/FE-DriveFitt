import { FranchiseHero } from "@/types/franchisePage";
import Image from "next/image";

interface HeroSectionProps {
  data: FranchiseHero;
  pageName: string;
  isMobile?: boolean;
}

const HeroSection = ({ data, isMobile }: HeroSectionProps) => {
  const {
    subTitle,
    title,
    description,
    roiTag,
    roiIcon,
    btnPrimaryText,
    mobileImage,
  } = data;
  return (
    <div
      className="flex items-center justify-center mb-[-60px]"
      style={{
        background: `url(${isMobile ? mobileImage : ""})`,
        backgroundPosition: "top center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-3 md:gap-6 mt-[85px] md:mt-[133px]">
          {/* Ecosystem Tag */}
          <div
            className="bg-[#0D2223] border items-center border-[#003434] rounded-full py-2 px-3 md:px-4 md:py-2 mb-0 md:mb-2 flex gap-1"
            style={{ boxShadow: "0px 4px 10px 0px #00DBDC1A" }}
          >
            <Image
              src="https://da8nru77lsio9.cloudfront.net/images/flash-on.svg"
              alt="ROI"
              width={16}
              height={16}
              className="mt-1"
            />
            <p className="text-[10px] tracking-[0%] font-light leading-3 md:text-base">
              {subTitle}
            </p>
          </div>

          {/* Main Title */}
          <div className="text-[40px] w-[70%] md:w-full h-auto flex-wrap justify-center md:text-[68px] font-light text-white flex tracking-[-2px] leading-[44px] md:leading-[78px] text-center">
            <span className="text-[#00DBDC] italic font-bold ">
              DRIVE&nbsp;
            </span>
            <span className=" italic font-bold">FITT&nbsp;&nbsp;</span>
            <span className="text-white">
              {isMobile ? title.toUpperCase() : title}
            </span>
          </div>

          {/* Description */}
          <p className="text-base md:text-2xl tracking-[0%] leading-[20px] md:tracking-[-2%] text-white max-w-[252px] md:max-w-2xl font-light mb-3 md:mb-4">
            {description}
          </p>

          {/* ROI Tag */}
          <div className="flex items-center gap-2 text-[#00DBDC] mb-1 md:mb-4 ">
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
          <button className="bg-[#00DBDC] border border-transparent text-[#0D0D0D] px-6 py-2.5 md:px-14 md:py-4 rounded-[4px] md:rounded-lg font-medium leading-[100%] tracking-[-2%] md:tracking-[-5%] text-sm md:text-xl hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC] transition-all duration-200">
            {btnPrimaryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
