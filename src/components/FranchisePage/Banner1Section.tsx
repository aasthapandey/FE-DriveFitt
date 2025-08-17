import { BannerSection } from "@/types/franchisePage";
import ScrollAnimation from "@/components/common/ScrollAnimation";

interface Banner1SectionProps {
  data: BannerSection;
  isMobile?: boolean;
}

const Banner1Section = ({ data, isMobile }: Banner1SectionProps) => {
  const { title, title1, subTitle, description1, description2, description3 } =
    data;
  return (
    <div className="w-full px-6 md:px-[120px] mt-12 md:mt-0">
      <ScrollAnimation delay={0.2} direction="up">
        <div
          className="w-full items-center justify-between text-center md:text-left h-fit md:h-[236px] rounded-[30px] border-[2px] border-[#333333] py-8 px-6 md:py-[38px] md:px-[86px] flex md:gap-[60px] md:flex-row flex-col gap-6"
          style={{
            background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
          }}
        >
          <ScrollAnimation
            delay={0.3}
            direction="left"
            className="font-semibold h-full flex gap-1 flex-col justify-center md:text-5xl leading-[100%] md:leading-[60px] tracking-[-2px] text-[40px]"
          >
            {title}&nbsp;
            <span>{title1}</span>
          </ScrollAnimation>
          <div
            className={`${isMobile ? "w-full h-[1px]" : "w-[1px] h-full"}`}
            style={{
              background: isMobile
                ? "linear-gradient(90deg, #0D0D0D 0%, #00DBDC 49.52%, #0D0D0D 100%)"
                : "linear-gradient(180deg, #0D0D0D 0%, #00DBDC 49.52%, #0D0D0D 100%)",
            }}
          ></div>
          <ScrollAnimation
            delay={0.4}
            direction="right"
            className="w-full md:w-[651px] flex flex-col gap-4 md:gap-6"
          >
            <div className="text-xl leading-6 font-bold">{subTitle}</div>
            <div className="text-base font-light">
              {description1}&nbsp;
              <span className="font-bold">{description2}&nbsp;</span>
              {description3}
            </div>
          </ScrollAnimation>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default Banner1Section;
