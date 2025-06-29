import { GallerySectionProps } from "@/types/staticPages";
import Image from "next/image";

const GallerySection = ({ data }: { data: GallerySectionProps }) => {
  const { title, description, btnLabel, imageList } = data;
  return (
    <div className="md:px-[120px] px-6 flex flex-col md:flex-row gap-[25px] md:gap-[104px] justify-between items-center">
      <div className="w-full md:w-2/5 flex flex-col text-center justify-center items-center md:text-start md:justify-start md:items-start gap-3 md:gap-4">
        <h2 className="text-2xl md:text-5xl font-semibold leading-7 md:leading-[56px] tracking-[-1px] md:tracking-[-2.4px]">
          {title}
        </h2>
        <p className="text-xs md:text-base font-light leading-4 md:leading-5 tracking-[-1%] text-[#8A8A8A]">
          {description}
        </p>
        <button className="bg-[#00DBDC] w-fit leading-[100%] tracking-[-5%] text-base text-[#0D0D0D] px-10 py-3 rounded-lg font-medium mt-2 md:mt-11">
          {btnLabel}
        </button>
      </div>
      <div className="w-full md:w-3/5">
        <div className="grid grid-cols-5 gap-2 h-[316px] md:h-[577px]">
          <div className="col-span-2 grid grid-rows-2 gap-2">
            <div className="row-span-1 relative h-full w-full rounded-[20px] overflow-hidden">
              <Image
                src={imageList[0]}
                alt="gallery-1"
                fill
                className="object-cover"
              />
            </div>
            <div className="row-span-1 relative h-full w-full rounded-[20px] overflow-hidden">
              <Image
                src={imageList[1]}
                alt="gallery-2"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="col-span-3 relative h-full w-full rounded-[20px] overflow-hidden">
            <Image
              src={imageList[2]}
              alt="gallery-3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
