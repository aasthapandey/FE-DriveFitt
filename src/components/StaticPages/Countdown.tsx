"use client";

import { CountdownSection } from "@/types/staticPages";
import { useEffect, useState } from "react";

interface CountdownProps {
  countdownData: CountdownSection;
  isMobile?: boolean;
}

const Countdown = ({ countdownData, isMobile }: CountdownProps) => {
  const { title, date, bgImage } = countdownData;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const getDigits = (number: number): [number, number] => {
    const paddedNumber = number.toString().padStart(2, "0");
    return [parseInt(paddedNumber[0]), parseInt(paddedNumber[1])];
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(date) - +new Date();
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
  }, [date]);

  const [daysFirst, daysSecond] = getDigits(timeLeft.days);
  const [hoursFirst, hoursSecond] = getDigits(timeLeft.hours);
  const [minutesFirst, minutesSecond] = getDigits(timeLeft.minutes);
  const [secondsFirst, secondsSecond] = getDigits(timeLeft.seconds);

  return (
    <div
      className="w-full h-fit md:h-[236px] rounded-[30px] border-[2px] border-[#343434]"
      style={{
        background: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "local",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col md:flex-row pt-6 pb-[38px] md:pb-[72px] md:pt-[40px] gap-4 md:gap-0 justify-between md:px-[46px] text-center md:text-left">
        <h2 className="px-8 md:px-0 w-full text-xl md:w-[402px] md:ml-[59px] leading-7 md:mt-8 text-white md:text-[32px] md:leading-[46px] font-semibold tracking-[-1px]">
          {title}
          <span className="text-[#00DBDC] italic">GURUGRAM</span>
        </h2>
        <div className="text-[#8A8A8A] text-[10px] md:text-sm md:leading-5 leading-3 text-center items-center flex flex-col gap-3">
          <div className="text-xs md:text-sm">Opening in</div>
          <div className="flex gap-3 md:gap-4">
            <div className="flex gap-2 flex-col">
              <div className="flex gap-1">
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {daysFirst}
                </div>
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white  text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {daysSecond}
                </div>
              </div>
              <div className="tracking-[4px]">DAYS</div>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex gap-1">
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white  text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {hoursFirst}
                </div>
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white  text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {hoursSecond}
                </div>
              </div>
              <div className="tracking-[4px]">HOURS</div>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex gap-1">
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white  text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {minutesFirst}
                </div>
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white  text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {minutesSecond}
                </div>
              </div>
              <div className="tracking-[4px]">MINUTE</div>
            </div>
            <div className="flex gap-2 flex-col">
              <div className="flex gap-1">
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white  text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {secondsFirst}
                </div>
                <div className="w-[30px] h-[49px] md:w-[42px] md:h-16 bg-[#0D0D0D] flex items-center justify-center rounded-lg text-white  text-xl md:text-[32px] font-semibold tracking-[-2px]">
                  {secondsSecond}
                </div>
              </div>
              <div className="tracking-[4px]">SECOND</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
