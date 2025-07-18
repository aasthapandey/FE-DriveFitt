import React, { useState, useEffect, useRef } from "react";

interface FlipCardProps {
  value: number;
  label: string;
}

const FlipCard = ({ value, label }: FlipCardProps) => {
  const [currentValue, setCurrentValue] = useState("00");
  const [prevValue, setPrevValue] = useState("00");
  const cardRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLElement>(null);
  const bottomRef = useRef<HTMLElement>(null);
  const backRef = useRef<HTMLElement>(null);
  const backBottomRef = useRef<HTMLElement>(null);

  const formatNumber = (num: number): string => {
    return ("0" + (num || 0)).slice(-2);
  };

  useEffect(() => {
    const newValue = formatNumber(value);

    if (newValue !== currentValue) {
      const top = topRef.current;
      const bottom = bottomRef.current;
      const back = backRef.current;
      const backBottom = backBottomRef.current;
      const card = cardRef.current;

      if (currentValue !== "00" && back && bottom) {
        back.setAttribute("data-value", currentValue);
        bottom.setAttribute("data-value", currentValue);
      }

      setPrevValue(currentValue);
      setCurrentValue(newValue);

      if (top) {
        top.textContent = newValue;
      }
      if (backBottom) {
        backBottom.setAttribute("data-value", newValue);
      }

      if (card) {
        card.classList.remove("flip");
        void card.offsetWidth;
        card.classList.add("flip");
      }
    }
  }, [value, currentValue]);

  return (
    <span className="flip-clock__piece">
      <b ref={cardRef} className="flip-clock__card card">
        <b ref={topRef} className="card__top">
          {currentValue}
        </b>
        <b ref={bottomRef} className="card__bottom" data-value={prevValue}></b>
        <b ref={backRef} className="card__back" data-value={prevValue}>
          <b
            ref={backBottomRef}
            className="card__bottom"
            data-value={currentValue}
          ></b>
        </b>
      </b>
      <span className="flip-clock__slot">{label}</span>
    </span>
  );
};

interface TimeState {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  total?: number;
}

interface FlipClockProps {
  countdown?: Date;
  onComplete?: () => void;
}

const FlipClock = ({ countdown, onComplete }: FlipClockProps) => {
  const [time, setTime] = useState<TimeState>({});
  const animationRef = useRef<number>();

  const getTimeRemaining = (endtime: Date): TimeState => {
    const t =
      Date.parse(endtime.toString()) - Date.parse(new Date().toString());
    return {
      total: t,
      days: Math.floor(t / (1000 * 60 * 60 * 24)),
      hours: Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((t / 1000 / 60) % 60),
      seconds: Math.floor((t / 1000) % 60),
    };
  };

  const getCurrentTime = (): TimeState => {
    const t = new Date();
    return {
      total: t.getTime(),
      hours: t.getHours() % 12,
      minutes: t.getMinutes(),
      seconds: t.getSeconds(),
    };
  };

  useEffect(() => {
    let frameCount = 0;

    const updateClock = () => {
      animationRef.current = requestAnimationFrame(updateClock);

      if (frameCount++ % 10 !== 0) return;

      const newTime = countdown
        ? getTimeRemaining(countdown)
        : getCurrentTime();

      if (countdown && newTime.total && newTime.total < 0) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onComplete && onComplete();
        return;
      }

      setTime(newTime);
    };

    setTimeout(updateClock, 500);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [countdown, onComplete]);

  const timeUnits = countdown
    ? [
        { key: "days", label: "Days", value: time.days || 0 },
        { key: "hours", label: "Hours", value: time.hours || 0 },
        { key: "minutes", label: "Minutes", value: time.minutes || 0 },
        { key: "seconds", label: "Seconds", value: time.seconds || 0 },
      ]
    : [
        { key: "hours", label: "Hours", value: time.hours || 0 },
        { key: "minutes", label: "Minutes", value: time.minutes || 0 },
        { key: "seconds", label: "Seconds", value: time.seconds || 0 },
      ];

  return (
    <div className="flip-clock">
      {timeUnits.map((unit) => (
        <FlipCard key={unit.key} value={unit.value} label={unit.label} />
      ))}
    </div>
  );
};

const TimeFlipCard = () => {
  const [countdownComplete, setCountdownComplete] = useState(false);

  const deadline = new Date(Date.now() + 12 * 24 * 60 * 60 * 1000);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#EEE",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <style>{`
        .flip-clock {
          text-align: center;
          perspective: 400px;
          margin: 20px auto;
        }

        .flip-clock *,
        .flip-clock *:before,
        .flip-clock *:after {
          box-sizing: border-box;
        }

        .flip-clock__piece {
          display: inline-block;
          margin: 0 5px;
        }

        .flip-clock__slot {
          font-size: 2vw;
          color: #333;
          margin-top: 10px;
          display: block;
        }

        .card {
          display: block;
          position: relative;
          padding-bottom: 0.72em;
          font-size: 9vw;
          line-height: 0.95;
        }

        .card__top,
        .card__bottom,
        .card__back::before,
        .card__back::after {
          display: block;
          height: 0.72em;
          color: #ccc;
          background: #222;
          padding: 0.25em 0.25em;
          border-radius: 0.15em 0.15em 0 0;
          backface-visibility: hidden;
          transform-style: preserve-3d;
          width: 1.8em;
          transform: translateZ(0);
          text-align: center;
          font-weight: bold;
        }

        .card__bottom {
          color: #FFF;
          position: absolute;
          top: 50%;
          left: 0;
          border-top: solid 1px #000;
          background: #393939;
          border-radius: 0 0 0.15em 0.15em;
          pointer-events: none;
          overflow: hidden;
        }

        .card__bottom::after {
          display: block;
          margin-top: -0.72em;
          content: attr(data-value);
        }

        .card__back::before {
          content: attr(data-value);
        }

        .card__back {
          position: absolute;
          top: 0;
          height: 100%;
          left: 0%;
          pointer-events: none;
        }

        .card__back::before {
          position: relative;
          z-index: -1;
          overflow: hidden;
        }

        .flip .card__back::before {
          animation: flipTop 0.3s cubic-bezier(.37,.01,.94,.35);
          animation-fill-mode: both;
          transform-origin: center bottom;
        }

        .flip .card__back .card__bottom {
          transform-origin: center top;
          animation-fill-mode: both;
          animation: flipBottom 0.6s cubic-bezier(.15,.45,.28,1);
        }

        @keyframes flipTop {
          0% {
            transform: rotateX(0deg);
            z-index: 2;
          }
          0%, 99% {
            opacity: 0.99;
          }
          100% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
        }

        @keyframes flipBottom {
          0%, 50% {
            z-index: -1;
            transform: rotateX(90deg);
            opacity: 0;
          }
          51% {
            opacity: 0.99;
          }
          100% {
            opacity: 0.99;
            transform: rotateX(0deg);
            z-index: 5;
          }
        }
      `}</style>

      {/* <h2>Countdown Timer</h2> */}
      <FlipClock
        countdown={deadline}
        onComplete={() => {
          setCountdownComplete(true);
          alert("Countdown complete!");
        }}
      />

      {countdownComplete && (
        <div style={{ color: "red", fontSize: "2em", margin: "20px" }}>
          Time's Up!
        </div>
      )}
      {/* 
      <h2>Current Time</h2>
      <FlipClock /> */}
    </div>
  );
};

export default TimeFlipCard;
