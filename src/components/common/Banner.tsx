import { SportsClubSectionProps } from "@/types/staticPages";
import TitleDescription from "@/components/common/TitleDescription";

type BannerType = {
  data: SportsClubSectionProps;
  pageName?: string;
  isMobile?: boolean;
};

const Banner = ({ data, pageName, isMobile }: BannerType) => {
  const { title, description, image, btnLabel } = data;
  return (
    <section className="md:px-[120px] px-4 flex flex-col gap-8">
      <div
        className="rounded-[20px] md:rounded-[40px] p-[2px] h-[224px] md:h-[534px]"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[20px] md:rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center p-6 md:p-10"
          style={{
            background: `linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 100%), url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachment: "local",
            backgroundSize: isMobile ? "contain" : "cover",
          }}
        >
          <div className="flex flex-col justify-end md:justify-center h-full items-center gap-4 md:gap-10">
            <TitleDescription
              title={title || ""}
              description={description || ""}
              isBanner={true}
            />
            <button className="bg-[#00DBDC] w-fit leading-[100%] tracking-[-5%] text-base text-[#0D0D0D] md:px-12 md:py-4 py-[10px] px-9 rounded-lg font-medium ">
              {btnLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
