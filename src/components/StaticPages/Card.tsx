import { CardType } from "@/types/staticPages";
import Image from "next/image";

interface CardProps {
  data: CardType;
  isMobile?: boolean;
  className?: string;
  imageClass?: string;
}

const Card = ({ data, isMobile, className, imageClass }: CardProps) => {
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
        className={`group relative block rounded-[20px] md:rounded-[40px] overflow-hidden h-[256px] md:h-[407px] !cursor-pointer w-full border-0 ${imageClass}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 transition duration-500 group-hover:backdrop-blur-sm" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute left-0 bottom-0 w-full p-6 md:px-10 md:py-[46px] z-10 flex flex-col transition-all duration-500 group-hover:bottom-2">
          <h3 className="text-white text-xl leading-6 md:leading-9 md:text-3xl font-semibold ">
            {title}
          </h3>
          <p className="text-white text-base md:text-lg font-light leading-tight tracking-tight hidden group-hover:block mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        </div>
        {link && (
          <div className="absolute flex items-center justify-center bottom-4 md:bottom-6 right-4 md:right-6 z-10">
            <Image
              src="/images/redirectionButton.svg"
              alt="redirectionBtn"
              width={isMobile ? 32 : 60}
              height={isMobile ? 32 : 60}
              className={`${isMobile ? "!size-8" : "!size-[60px]"}`}
            />
          </div>
        )}
      </a>
    </div>
  );
};

export default Card;
