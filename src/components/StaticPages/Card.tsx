import { CardType } from "@/types/staticPages";
import Image from "next/image";

interface CardProps {
  data: CardType;
  isMobile?: boolean;
  className?: string;
}

const Card = ({ data, isMobile, className }: CardProps) => {
  const { title, description, backgroundImage, link } = data;

  return (
    <div
      className={`rounded-[20px] md:rounded-[40px] p-[2px] ${className}`}
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <a
        href={link}
        className={`group relative block rounded-[20px] md:rounded-[40px] overflow-hidden h-[256px] md:h-[407px] cursor-pointer w-full border-0 ${className}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 transition duration-300 group-hover:backdrop-blur-sm" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div
          className={`absolute left-0 bottom-0 w-full p-4 md:p-6 z-10 flex flex-col ${
            isMobile ? "" : "transition-all duration-300 group-hover:bottom-20"
          }`}
        >
          <h3 className="text-white text-xl leading-6 md:leading-9 md:text-3xl font-semibold">
            {title}
          </h3>
          <p
            className={`ml-[3px] text-white text-base md:text-lg font-light leading-tight tracking-tight ${
              isMobile
                ? "mt-2"
                : "group-hover:mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            }`}
          >
            {description}
          </p>
        </div>
        <div className="absolute flex items-center justify-center bottom-4 md:bottom-6 right-4 md:right-6 z-10">
          <Image
            src="/images/redirectionButton.svg"
            alt="redirectionBtn"
            width={isMobile ? 32 : 48}
            height={isMobile ? 32 : 48}
            className={`${isMobile ? "!size-8" : "!size-12"}`}
          />
        </div>
      </a>
    </div>
  );
};

export default Card;
