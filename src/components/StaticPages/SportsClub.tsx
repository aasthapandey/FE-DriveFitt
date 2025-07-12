import { SportsClubSectionProps } from "@/types/staticPages";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";

interface SportsClubProps {
  data: SportsClubSectionProps;
  isMobile?: boolean;
}

const SportsClub = ({ data, isMobile }: SportsClubProps) => {
  const { title, description, image, mobileImage } = data;
  const imageToUse = isMobile && mobileImage ? mobileImage : image;

  return (
    <section className="md:-mb-[94px]">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="w-full flex justify-center">
        <Image
          src={imageToUse}
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
