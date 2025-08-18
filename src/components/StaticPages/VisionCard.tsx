import { Card } from "@/types/franchisePage";
import Image from "next/image";

interface VisionCardProps {
  card: Card;
  className?: string;
  isHorizontal?: boolean;
}

const VisionCard = ({ card, className }: VisionCardProps) => {
  const { icon, title, description, subTitle, tooltipImage } = card;

  // Define specific positioning for each person based on their image
  const getImageStyles = (personName: string) => {
    switch (personName) {
      case "Mark Sellar":
        return {
          objectPosition: "center bottom",
          objectFit: "cover" as const,
          left: "25%",
          top: "6%",
        };
      case "Deke Smith":
        return {
          objectPosition: "center bottom",
          objectFit: "cover" as const,
          left: "25%",
          top: "4%",
        };
      case "Shubman Gill":
        return {
          objectPosition: "center bottom",
          objectFit: "cover" as const,
          right: "25%",
          top: "10%",
        };
      case "Preity G Zinta":
        return {
          objectPosition: "center bottom",
          objectFit: "cover" as const,
          left: "25%",
          top: "8%",
        };
      case "Vikram Bhatia":
        return {
          objectPosition: "center bottom",
          objectFit: "cover" as const,
          left: "25%",
          top: "10%",
        };
      default:
        return {
          objectPosition: "center bottom",
          objectFit: "cover" as const,
          left: "25%",
          top: "10%",
        };
    }
  };

  const imageStyles = getImageStyles(title);

  return (
    <div
      className={`rounded-[20px] md:rounded-[40px] h-[429px] flex overflow-hidden relative border border-[#333333] ${className}`}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url("/images/VisionaryCardBg.svg")`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Person Image */}
      <div
        className="absolute top-0 left-0 w-full h-[380px] overflow-hidden "
        style={imageStyles}
      >
        <Image src={icon} alt={title} width={286} height={380} />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(17, 17, 17, 0) 53.15%, #141414 94.04%)",
        }}
      />

      {/* Content */}
      <div className="absolute flex flex-col items-center justify-center gap-1">
        {tooltipImage ? (
          <div>
            <Image
              src={tooltipImage}
              alt={title}
              height={39}
              width={150}
              className="w-fit !h-[39px]"
            />
          </div>
        ) : (
          <div className="bg-[#00DBDC] text-[#0D0D0D] px-3 py-1 rounded-md text-sm font-semibold w-fit">
            {title}
          </div>
        )}
        <p className="text-[#00DBDC] text-xs font-light tracking-[0%] leading-4 italic">
          {subTitle}
        </p>
      </div>
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="text-[#FFFFFF99] font-light text-sm tracking-[-2%] text-center leading-5">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VisionCard;
