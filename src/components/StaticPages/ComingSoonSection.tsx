import type { ComingSoonSection } from "@/types/staticPages";
import Link from "next/link";

interface ComingSoonSectionProps {
  data: ComingSoonSection;
  isMobile?: boolean;
}

const ComingSoonSection = ({ data }: ComingSoonSectionProps) => {
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
    <div className="flex items-center justify-center h-screen">
      <div className="mx-auto text-center px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-8 w-[80px] h-[80px] md:mb-[48px] md:w-[120px] md:h-[120px]">
            <img
              src={iconImage}
              alt="Coming Soon"
              className="opacity-60 w-full h-full"
            />
          </div>
          <h1 className="text-white text-[32px] font-semibold leading-[40px] tracking-[-1px] mb-4 md:text-[48px] md:font-bold md:leading-[60px] md:tracking-[-2px] md:mb-[24px] md:w-[497px] md:h-[120px]">
            {title}
          </h1>

          <p className="text-[#FFFFFF] text-[14px] font-light leading-5 tracking-[-0.5px] mb-8 max-w-[300px] md:text-[16px] md:leading-6 md:tracking-[-1px] md:mb-[48px] md:max-w-none">
            {description}
          </p>

          <div className="flex flex-row gap-4 md:flex-row md:gap-4 md:w-auto">
            <Link href={btnSecondaryLink} className="w-full md:w-auto">
              <button className="w-[155px] text-[#00DBDC] border border-[#00DBDC] rounded-[8px] py-3 text-[16px] font-medium leading-[24px] md:w-[224px] md:h-[56px] md:text-[20px] md:leading-[100%] md:tracking-[-2%] md:py-4 md:px-12">
                {btnSecondaryText}
              </button>
            </Link>

            <Link href={btnPrimaryLink} className="w-full md:w-auto">
              <button className="w-[155px] bg-[#00DBDC] rounded-[8px] py-3 text-[16px] font-medium leading-[24px] text-[#0D0D0D] md:w-[224px] md:h-[56px] md:text-[20px] md:leading-[100%] md:tracking-[-2%] md:py-4">
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
