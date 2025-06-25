import { AppDownloadProps } from "@/types/staticPages";
import Image from "next/image";

const AppDownload = ({ data }: { data: AppDownloadProps }) => {
  const {
    title,
    description,
    googlePlayImg,
    appStoreImg,
    dfLogo,
    mobileImage,
  } = data;
  return (
    <div className="relative px-[120px]">
      <Image
        src={mobileImage}
        alt="mobile"
        width={400}
        height={400}
        className="absolute bottom-[2px] right-[190px] z-20"
      />
      <div
        className="rounded-[40px] p-[2px] h-[540px]"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
          }}
        >
          <div className="flex flex-start py-[124px] pl-[92px]">
            <div className="flex flex-col gap-6 z-10 w-[573px] h-[292px]">
              <h2 className="text-5xl font-semibold leading-[56px] tracking-[-2px]">
                {title}
              </h2>
              {description && (
                <p className="text-base font-light leading-5 tracking-[-1%] text-[#8A8A8A] mb-[80px]">
                  {description}
                </p>
              )}
              <div className="flex gap-4 justify-start">
                <Image
                  src={googlePlayImg}
                  alt="google-play"
                  width={180}
                  height={56}
                />
                <Image
                  src={appStoreImg}
                  alt="app-store"
                  width={180}
                  height={56}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
