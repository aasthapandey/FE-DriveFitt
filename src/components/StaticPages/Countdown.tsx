import TimeFlipCard from "@/components/StaticPages/TimerFlipCard";
import { CountdownProps } from "@/types/staticPages";

const Countdown = ({ countdownData, isMobile }: CountdownProps) => {
  const { title, date, bgImage, mobileBgImage, location, openingText, labels } =
    countdownData;

  if (!title || !date || !bgImage) {
    return null;
  }

  const safeLabels = labels || {
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    seconds: "SECONDS",
  };

  const backgroundImage = isMobile && mobileBgImage ? mobileBgImage : bgImage;

  return (
    <div
      className="w-full max-w-[1200px] mx-auto h-fit md:h-[236px] rounded-[30px]"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row pt-6 pb-[38px] md:pb-[72px] md:pt-[40px] gap-4 md:gap-0 justify-between md:px-[46px] text-center md:text-left">
        <h2 className="px-8 md:px-0 w-full text-xl md:w-[402px] md:ml-[59px] leading-7 text-white md:text-[32px] md:leading-[46px] font-semibold tracking-[-1px]">
          {title}
          <span className="text-[#00DBDC] italic">{location}</span>
        </h2>
        <div className="text-[#8A8A8A] text-[10px] md:text-sm md:leading-5 leading-3 text-center items-center flex flex-col gap-3">
          <div className="text-xs md:text-sm">{openingText}</div>
          <TimeFlipCard countdownDate={date} labels={safeLabels} />
        </div>
      </div>
    </div>
  );
};

export default Countdown;
