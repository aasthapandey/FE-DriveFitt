import { MemberItem } from "@/types/staticPages";
import Image from "next/image";

const MemberCard = ({ data }: { data: MemberItem }) => {
  const { title, description, backgroundImage } = data;
  return (
    <div
      className="relative rounded-[40px] h-[304px] md:h-[568px] w-full cursor-pointer"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
        <h3 className="text-white leading-6 tracking-0 text-xl font-semibold">
          {title}
        </h3>
        <p className="text-[#D4D4D8] text-sm font-normal leading-[22px] tracking-0">
          {description}
        </p>
      </div>
      <div className="absolute bottom-1 right-1">
        <Image src="/images/Play.svg" alt="play" width={98} height={98} />
      </div>
    </div>
  );
};

export default MemberCard;
