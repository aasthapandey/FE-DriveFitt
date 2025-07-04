import { Hero } from "@/types/staticPages";
import CountdownTimer from "@/components/StaticPages/CountdownTimer";
import { homeData } from "@/data/home";

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
          <span className="text-white">India&apos;s First </span>
          <span className="text-[#00DBDC]">Cricket </span>
          <span className="text-white">and </span>
          <span className="text-[#00DBDC]">Fitness </span>
          <span className="text-white">Club</span>
        </h1>
      );
    } else if (pageName === "cricket") {
      return (
        <h1 className="text-white text-[42px] leading-[50px] tracking-[-2px] md:leading-[72px] md:text-6xl font-bold md:mb-7 mb-[22px]">
          <span className="text-[#00DBDC] italic">DRIVE:</span>
          {title}
        </h1>
      );
    } else if (pageName === "running") {
      return (
        <h1 className="text-white text-[42px] leading-[50px] tracking-[-2px] md:leading-[72px] md:text-6xl font-bold md:mb-7 mb-[22px]">
          {title}
          <span className="italic">DRIVE FITT.</span>
        </h1>
      );
    } else {
      return (
        <h1 className="text-white text-[42px] leading-[50px] tracking-[-2px] md:leading-[72px] md:text-6xl font-bold md:mb-7 mb-[22px]">
          {title}
        </h1>
      );
    }
  };
  return (
    <>
      <div className="h-fit md:h-[745px] flex flex-col justify-center md:justify-start items-center md:items-start text-center md:text-start px-6 md:px-20">
        <div
          className={`${
            pageName === "cricket"
              ? "max-w-full md:max-w-[739px]"
              : "max-w-full md:max-w-[600px]"
          } ${
            pageName === "home"
              ? "mt-[267px] md:mt-[145px]"
              : `${
                  pageName === "recovery"
                    ? "md:mt-[197px] mt-[170px]"
                    : "md:mt-[125px] mt-[170px]"
                }`
          }`}
        >
          {renderTitle()}
          {pageName !== "home" ? (
            <p className="text-white md:text-base md:leading-5 text-sm leading-[18px] tracking-[-2%] font-light mb-[28px] md:mb-[60px]">
              {description}
            </p>
          ) : null}
          <div className="flex gap-4 justify-center md:justify-start">
            {btnPrimaryText && (
              <button className="bg-[#00DBDC] text-[#0D0D0D] px-6 py-3 md:px-14 md:py-4  rounded-lg font-medium leading-[100%] tracking-[-5%] text-base md:text-xl">
                {isMobile ? btnSecondaryText : btnPrimaryText}
              </button>
            )}
            {btnSecondaryText &&
              btnSecondaryText !== "" &&
              !isMobile &&
              pageName !== "home" && (
                <button className="border border-[#00DBDC] text-[#00DBDC] px-10 py-3 md:px-14 md:py-4 rounded-lg font-medium leading-[100%] tracking-[-5%] text-base md:text-xl">
                  {btnSecondaryText}
                </button>
              )}
          </div>
        </div>
      </div>
      {pageName === "home" && homeData.countdownSection && (
        <CountdownTimer
          countdownData={homeData.countdownSection}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default HeroSection;
