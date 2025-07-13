import { Hero, TitleWord } from "@/types/staticPages";
import CountdownTimer from "@/components/StaticPages/CountdownTimer";
import { homeData } from "@/data/home";

interface HeroSectionProps {
  data: Hero;
  pageName?: string;
  isMobile?: boolean;
}

const HeroSection = ({ data, pageName, isMobile }: HeroSectionProps) => {
  const { titleWords, description, btnPrimaryText, btnSecondaryText } = data;
  const renderTitle = (titleWords: TitleWord[]) => {
    return (
      <h1 className="text-white text-[42px] leading-[50px] tracking-[-2px] md:leading-[72px] md:text-6xl font-bold md:mb-[24px] mb-[22px]">
        {titleWords.map((word, index) => (
          <span
            key={index}
            className={`${word.color ? `text-[${word.color}]` : "text-white"} ${
              word.isItalic ? "italic" : ""
            }`}
          >
            {word.text}
          </span>
        ))}
      </h1>
    );
  };
  return (
    <>
      <div className="h-fit md:h-[745px] flex flex-col justify-center md:justify-start items-center md:items-start text-center md:text-start px-6 md:px-[120px]">
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
          {renderTitle(titleWords)}
          {pageName !== "home" ? (
            <p className="text-white md:text-base md:leading-5 text-sm leading-[18px] tracking-[-2%] font-light mb-[28px] md:mb-[80px] md:max-w-[486px]">
              {description}
            </p>
          ) : null}
          <div className="flex gap-4 justify-center md:justify-start">
            {btnPrimaryText && (
              <button
                className={`bg-[#00DBDC] border border-transparent text-[#0D0D0D] px-6 py-3 md:px-14 md:py-4 rounded-lg font-medium leading-[100%] tracking-[-5%] text-base md:text-xl ${
                  isMobile
                    ? ""
                    : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
                } transition-all duration-200`}
              >
                {isMobile ? btnSecondaryText : btnPrimaryText}
              </button>
            )}
            {btnSecondaryText &&
              btnSecondaryText !== "" &&
              !isMobile &&
              pageName !== "home" && (
                <button
                  className={`bg-transparent border border-[#00DBDC] text-[#00DBDC] px-10 py-3 md:px-14 md:py-4 rounded-lg font-medium leading-[100%] tracking-[-5%] text-base md:text-xl ${
                    isMobile ? "" : "hover:bg-[#00DBDC] hover:text-[#0D0D0D]"
                  } transition-all duration-200`}
                >
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
