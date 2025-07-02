import type { Error404Section } from "@/types/staticPages";
import Link from "next/link";

interface Error404SectionProps {
  data: Error404Section;
  isMobile?: boolean;
}

const Error404Section = ({ data, isMobile }: Error404SectionProps) => {
  const {
    title,
    description,
    iconImage: illustration,
    btnText,
    btnLink = "/",
  } = data;

  return (
    <div className="flex items-center justify-center mt-[154px]">
      <div className="mx-auto text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-[48px] ">
            <img
              src={illustration}
              alt="UFO 404 Illustration"
              width={isMobile ? 120 : 160}
              height={isMobile ? 120 : 160}
              className="opacity-80"   
            />
          </div>
          {/*md:max-w-[240px] md:max-h-[28px] md:font-semibold md:text-[24px] md:leading-[28px] md:tracking-[-1px] */}
          <h1 className="text-[#FFFFF7] max-w-[479px] max-h-[60px] font-semibold text-[48px] leading-[60px] tracking-[-2px] text-center mb-[24px]">
            {title}
          </h1>
        
          {/* md:max-w-[364px] md:max-h-[16px] md:text-[12px] md:leading-[16px] */}
          <p className="max-w-[262px] max-h-[24px] font-light text-[16px] leading-[24px] tracking-[-1px] text-center mb-[48px]">
            {description}
          </p>
          
          {/* md:max-w-[108px] md:max-h-[20px] md:text-[14px] md:leading-[20px]  */}
          <Link href={btnLink}>
            <button className="bg-[#00DBDC] w-[187px] h-[56px] rounded-[8px] py-4 gap-[10px] font-medium text-[20px] leading-[100%] tracking-[-2%] text-black">
              {btnText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404Section; 