import { InfoSection } from "@/types/staticPages";
import Image from "next/image";

const InfoCard = ({ data }: { data: InfoSection }) => {
  const { title, list } = data;
  return (
    <div
      className="rounded-[40px] p-[2px] h-[364px]"
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <div
        className="rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center"
        style={{
          background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
        }}
      >
        <div className="flex p-10 flex-col gap-6 z-10">
          <h2 className="w-[200px] font-medium text-[28px] leading-[100%] tracking-[-1px]">
            {title}
          </h2>
          {list.map((item) => (
            <div
              key={item.description}
              className="flex gap-4 justify-start items-center"
            >
              <Image
                src={item.image}
                alt={item.description}
                width={48}
                height={48}
              />
              <p className="font-normal text-base leading-[22px] tracking-[-3%]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
