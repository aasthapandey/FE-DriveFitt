import { CardType } from "@/types/staticPages";
import Image from "next/image";

const Card = ({ data }: { data: CardType }) => {
  const { title, description, backgroundImage, link } = data;

  return (
    <a
      href={link}
      className="group relative block rounded-3xl overflow-hidden h-[407px] cursor-pointer border-2"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderImage:
          "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%) 1",
        borderStyle: "solid",
      }}
    >
      <div className="absolute inset-0 transition duration-300 group-hover:backdrop-blur-sm" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute left-0 bottom-0 p-6 z-10">
        <h3 className="text-white text-3xl font-bold">{title}</h3>
      </div>

      <div className="absolute left-0 bottom-0 w-full p-6 z-10 transition-all duration-300 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-white text-lg">{description}</p>
      </div>
      <div className="absolute flex items-center justify-center bottom-6 rounded-[50%] right-6 z-10 bg-[#0D0D0D]">
        <Image
          src="/images/redirectionButton.svg"
          alt="redirectionBtn"
          width={48}
          height={48}
          className="!size-12"
        />
      </div>
    </a>
  );
};

export default Card;
