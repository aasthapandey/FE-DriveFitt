import { Hero } from "@/types/staticPages";

interface HeroSectionProps {
  data: Hero;
  pageName?: string;
  isMobile?: boolean;
}

const HeroSection = ({ data, pageName, isMobile }: HeroSectionProps) => {
  const { title, description, btnPrimaryText, btnSecondaryText } = data;
  const renderTitle = () => {
    if (pageName === "home") {
      return (
        <h1 className="text-white text-[42px] leading-[50px] tracking-[-2px] md:leading-[72px] md:text-6xl font-bold md:mb-7 mb-[22px]">
          {title}
          {!isMobile && <span className="text-[#00DBDC] italic">STRIVE</span>}
        </h1>
      );
    } else if (pageName === "cricket") {
      return (
        <h1 className="text-white text-6xl font-bold mb-4">
          <span className="text-[#00DBDC] italic">DRIVE:</span>
          {title}
        </h1>
      );
    } else {
      return <h1 className="text-white text-6xl font-bold mb-4">{title}</h1>;
    }
  };
  return (
    <div className="h-fit md:h-[857px] flex flex-col justify-center items-center md:items-start text-center md:text-start px-6 md:px-20">
      <div
        className={`${
          pageName === "cricket"
            ? "max-w-full md:max-w-[739px]"
            : "max-w-full md:max-w-[600px]"
        } ${pageName === "home" ? "mt-[267px] md:mt-0" : ""} `}
      >
        {renderTitle()}
        {pageName !== "home" ? (
          <p className="text-white text-base mb-3 md:mb-[60px]">
            {description}
          </p>
        ) : null}
        <div className="flex gap-4 justify-center md:justify-start">
          {btnPrimaryText && (
            <button className="bg-[#00DBDC] text-[#0D0D0D] px-10 py-3 md:px-14 md:py-4  rounded-lg font-medium leading-[100%] tracking-[-5%] text-base md:text-xl">
              {btnPrimaryText}
            </button>
          )}
          {btnSecondaryText && btnSecondaryText !== "" && (
            <button className="border border-[#00DBDC] text-[#00DBDC] px-10 py-3 md:px-14 md:py-4 rounded-lg font-medium leading-[100%] tracking-[-5%] text-base md:text-xl">
              {btnSecondaryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
