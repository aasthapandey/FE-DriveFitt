import type { ComingSoonSection } from "@/types/staticPages";
import Link from "next/link";

interface ComingSoonSectionProps {
  data: ComingSoonSection;
  isMobile?: boolean;
}

const ComingSoonSection = ({ data, isMobile }: ComingSoonSectionProps) => {
  const {
    title,
    description,
    iconImage,
    btnPrimaryText,
    btnSecondaryText,
    btnPrimaryLink = "#",
    btnSecondaryLink = "/",
  } = data;

  return (
    <div className="mt-[158px] flex items-center justify-center">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 md:mb-[24px]">
            <img
              src={iconImage}
              alt="Coming Soon"
              width={isMobile ? 80 : 120}
              height={isMobile ? 80 : 120}
              className="opacity-60"   
            />
          </div>
          {/* md:max-w-[256px] md:max-h-[56px] md:font-semibold md:text-[24px] md:leading-[28px] md:tracking-[-1px] md:mb-[8px] */}
          <h1 className="text-white text-[48px] font-bold leading-[60px] tracking-[-2px] mb-[24px] w-[497px] h-[120px]">
            {title}
          </h1>
        
          {/* md:mb-[32px] w-[791px] md:w-[364px] md:h-[32px] md:font-light md:text-[12px] md:leading-[16px] md:tracking-[-1px] md:text-[1.125rem]*/}
          <p className="text-[#FFFFFF] text-[16px]  font-light leading-6 tracking-['-1px'] mb-[48px] ">
            {description}
          </p>

          <div className={`flex flex-row gap-4 md:gap-[9.5px] items-center justify-center`}>

            <Link href={btnSecondaryLink}>
              <button className="text-[#00DBDC] border border-[#00DBDC] rounded-[8px] cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[1px] w-[224px] h-[56px] pt-4 pr-12 pb-4 pl-12 gap-[10px] font-inter font-medium text-[20px] leading-[100%] tracking-[-2%]">
                {btnSecondaryText}
              </button>
            </Link>

            <Link href={btnPrimaryLink}>
              <button className="bg-[#00DBDC] rounded-[8px] cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[1px] w-[224px] h-[56px] py-4 gap-[10px] font-inter font-medium text-[20px] leading-[100%] tracking-[-2%] text-[#0D0D0D]">
                {btnPrimaryText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonSection; 