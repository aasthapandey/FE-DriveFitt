import { RecoveryBannerProps } from "@/types/staticPages";

type RecoveryBannerType = {
  data: RecoveryBannerProps;
  isMobile?: boolean;
};

const RecoveryBanner = ({ data, isMobile }: RecoveryBannerType) => {
  const { title, description, image, mobileImage } = data;
  const imageToUse = isMobile && mobileImage ? mobileImage : image;

  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5 ">
      <div
        className="rounded-[20px] md:rounded-[40px] p-[2px] h-[224px] md:h-[408px]"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[20px] md:rounded-[40px] w-full h-full flex flex-col justify-center p-6"
          style={{
            background: `linear-gradient(180deg, rgba(13, 13, 13, 0) 0%, #0D0D0D 100%), url(${imageToUse})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundAttachment: "local",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col h-full items-start max-w-[600px] md:pl-[36px] md:pt-[36px] md:pb-[36px]">
            <h2 className="text-white text-2xl md:text-[48px] md:leading-[66px] font-semibold tracking-[-2.4px] mb-4 md:mb-[28px] md:max-w-[441px] capitalize">
              {title}
            </h2>
            <p className="text-white text-[16px] md:text-[16px] leading-[18px] md:leading-[32px] font-light tracking-[0px] md:max-w-[536px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecoveryBanner;
