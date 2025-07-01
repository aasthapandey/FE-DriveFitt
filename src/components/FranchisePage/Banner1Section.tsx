import { BannerSection } from "@/types/franchisePage";

interface Banner1SectionProps {
  data: BannerSection;
  isMobile?: boolean;
}

const Banner1Section = ({ data, isMobile }: Banner1SectionProps) => {
  const { title, subTitle, description1, description2, description3 } = data;
  return (
    <div className="w-full px-6 md:px-[120px] mt-[39px] md:mt-0">
      <div
        className="w-full items-center justify-between text-center md:text-left h-fit md:h-[236px] rounded-[30px] border-[2px] border-[#333333] p-5 md:py-[38px] md:px-[86px] flex md:gap-[60px] md:flex-row flex-col gap-[30px]"
        style={{
          background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
        }}
      >
        <div className="font-semibold h-full flex gap-1 md:flex-col flex-row justify-center md:text-5xl leading-[60px] tracking-[-2px] text-2xl">
          Why&nbsp;
          <span className="italic">{title}</span>
        </div>
        {isMobile ? null : (
          <div
            className="w-[1px] h-full"
            style={{
              background:
                "linear-gradient(90deg, #0D0D0D 0%, #00DBDC 49.52%, #0D0D0D 100%)",
            }}
          ></div>
        )}
        <div className="w-full md:w-[651px] flex flex-col gap-4 md:gap-6">
          <div className="text-xl leading-6 font-bold">{subTitle}</div>
          <div className="text-base font-light">
            {description1}&nbsp;
            <span className="font-bold">{description2}&nbsp;</span>
            {description3}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner1Section;
