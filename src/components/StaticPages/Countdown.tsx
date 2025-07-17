"use client";

import { CountdownSection } from "@/types/staticPages";
import { useEffect, useState, useRef } from "react";

interface CountdownProps {
  countdownData: CountdownSection;
  isMobile?: boolean;
}

interface FlipCardProps {
  value: number;
  label: string;
  isMobile?: boolean;
}

const FlipCard = ({ value, label, isMobile }: FlipCardProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const [nextValue, setNextValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (value !== prevValueRef.current) {
      setNextValue(value);
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setCurrentValue(value);
        setIsFlipping(false);
      }, 300);
      prevValueRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  const paddedCurrentValue = currentValue.toString().padStart(2, "0");
  const paddedNextValue = nextValue.toString().padStart(2, "0");

  return (
    <div className="flex flex-col gap-2">
      <div className={`flip-number ${isFlipping ? "flipping" : ""}`}>
        <div
          className={`${
            isMobile ? "w-[60px] h-[49px]" : "w-[84px] h-16"
          } bg-[#0D0D0D] rounded-lg overflow-hidden relative`}
        >
          <div className="flip-number-front">
            <div
              className={`text-white ${
                isMobile ? "text-xl" : "text-[32px]"
              } font-semibold tracking-[-2px]`}
            >
              {paddedCurrentValue}
            </div>
          </div>
          <div className="flip-number-back">
            <div
              className={`text-white ${
                isMobile ? "text-xl" : "text-[32px]"
              } font-semibold tracking-[-2px]`}
            >
              {paddedNextValue}
            </div>
          </div>
        </div>
      </div>
      <div className="tracking-[4px] text-center">{label}</div>
    </div>
  );
};

const Countdown = ({ countdownData, isMobile }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!countdownData?.date) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(countdownData.date) - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownData?.date]);

  if (!countdownData) {
    return null;
  }

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
          <div className="flex gap-3 md:gap-4">
            <FlipCard
              value={timeLeft.days}
              label={safeLabels.days}
              isMobile={isMobile}
            />
            <FlipCard
              value={timeLeft.hours}
              label={safeLabels.hours}
              isMobile={isMobile}
            />
            <FlipCard
              value={timeLeft.minutes}
              label={safeLabels.minutes}
              isMobile={isMobile}
            />
            <FlipCard
              value={timeLeft.seconds}
              label={safeLabels.seconds}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
