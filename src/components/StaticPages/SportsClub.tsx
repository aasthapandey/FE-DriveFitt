import { SportsClubSectionProps } from "@/types/staticPages";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";

const SportsClub = ({ data }: { data: SportsClubSectionProps }) => {
  const { title, description, image } = data;
  return (
    <section className="-mb-[94px]">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="w-full flex justify-center">
        <Image
          src={image}
          alt={title || ""}
          width={1440}
          height={775}
          className="mt-[1px] max-w-full h-auto"
        />
      </div>
    </section>
  );
};

export default SportsClub;
