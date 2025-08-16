"use client";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import { GallerySectionProps } from "@/types/staticPages";

const BannerCTASection = ({
  data,
  isMobile,
}: {
  data: GallerySectionProps;
  isMobile?: boolean;
}) => {
  const { title, description, btnLabel, desktopImage, mobileImage } = data;

  const handleButtonClick = () => {
    window.location.href = "/coming-soon";
  };

  return (
    <div
      className="md:px-[120px] px-6 flex flex-col md:flex-row gap-[25px] md:gap-[104px] w-full justify-between items-center"
      style={{
        background: `linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 100%), url(${
          isMobile ? mobileImage : desktopImage
        })`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "local",
        backgroundSize: "cover",
      }}
    >
      <ScrollAnimation
        delay={0.2}
        direction="left"
        className="w-full md:w-2/5 flex flex-col text-center justify-center items-center md:text-start md:justify-start md:items-start gap-3 md:gap-4"
      >
        <h2
          className={`${
            isMobile
              ? "text-2xl font-semibold leading-7 tracking-[-1px]"
              : "text-5xl font-semibold leading-[56px] tracking-[-2.4px]"
          } md:text-5xl md:font-semibold md:leading-[56px] md:tracking-[-2.4px]`}
        >
          {title}
        </h2>
        <p
          className={`${
            isMobile
              ? "text-xs font-light leading-4 tracking-[-1%] text-[#8A8A8A]"
              : "text-lg font-light leading-7 tracking-[-0.9px]"
          } md:text-lg md:font-light md:leading-7 md:tracking-[-0.9px]`}
        >
          {description}
        </p>
        <button
          onClick={() => handleButtonClick()}
          className={`bg-[#00DBDC] border border-transparent w-fit leading-[100%] tracking-[-5%] text-base text-[#0D0D0D] px-10 py-3 rounded-[4px] md:rounded-lg font-medium mt-2 md:mt-[60px] ${
            isMobile
              ? "h-[37px] font-medium text-sm leading-none tracking-tighter"
              : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
          } transition-all duration-200 md:px-[48px] md:h-[50px]`}
        >
          {btnLabel}
        </button>
      </ScrollAnimation>
    </div>
  );
};

export default BannerCTASection;
