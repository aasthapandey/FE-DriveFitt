import { SportsClubSectionProps } from "@/types/staticPages";
import TitleDescription from "@/components/common/TitleDescription";

type BannerType = {
  data: SportsClubSectionProps;
  isMobile?: boolean;
};

const Banner = ({ data, isMobile }: BannerType) => {
  const { title, description, image, mobileImage, btnLabel } = data;
  const imageToUse = isMobile && mobileImage ? mobileImage : image;

  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5 md:gap-8">
      <div
        className="rounded-[20px] md:rounded-[40px] p-[2px] h-[224px] md:h-[534px]"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[20px] md:rounded-[40px] w-full h-full  flex flex-col justify-center p-6 md:p-10"
          style={{
            background: `linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 100%), url(${imageToUse})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachment: "local",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="flex flex-col justify-end md:justify-center h-full items-center gap-4 md:gap-10 md:pt-[115px]">
            <TitleDescription
              title={title || ""}
              description={description || ""}
              isBanner={true}
            />
            <button
              className={`bg-[#00DBDC] border border-transparent w-fit leading-[100%] tracking-[-5%] text-base text-[#0D0D0D] md:px-12 py-[10px] px-9 rounded-lg font-medium ${
                isMobile
                  ? ""
                  : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
              } transition-all duration-200 md:h-[50px] cursor-pointer`}
            >
              {btnLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
