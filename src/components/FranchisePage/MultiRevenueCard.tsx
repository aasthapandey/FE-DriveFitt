import { Card } from "@/types/franchisePage";
import Image from "next/image";

const MultiRevenueCard = ({ card }: { card: Card }) => {
  const { icon, title, description } = card;
  return (
    <div
      className="rounded-[20px] md:rounded-[40px] p-[2px] h-[272px]"
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <div
        className="rounded-[20px] md:rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center"
        style={{
          background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
        }}
      >
        <div className="p-10 flex flex-col items-center gap-4 text-white">
          <Image
            src={icon}
            alt={title}
            width={100}
            height={100}
            className="mb-3 md:size-[100px] size-[60px]"
          />
          <h3 className="text-2xl leading-7 tracking-[-1px] font-semibold">
            {title}
          </h3>
          <p className="text-sm leading-5 tracking-[-2%] font-light">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiRevenueCard;
