import { PhotoCircleSectionProps } from "@/types/staticPages";
import Image from "next/image";

const PhotoCircleSection = ({
  data,
  isMobile,
}: {
  data: PhotoCircleSectionProps;
  isMobile?: boolean;
}) => {
  const { title, description, image1, image2 } = data;

  return (
    <section
      className="md:px-[120px] px-6 flex flex-col gap-5 md:gap-8"
      style={{
        background: isMobile
          ? "none"
          : "radial-gradient(50% 50% at 50% 50%, #00DBDC33 0%, transparent 100%)",
      }}
    >
      <div className="relative flex items-center justify-center min-h-[440px]">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex flex-col items-center justify-center w-full px-4">
            <div className="flex items-center justify-center flex-shrink-0">
              <div
                className="rounded-full p-[2px] w-[260px] h-[260px]"
                style={{
                  background:
                    "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
                  backgroundColor: "#00DBDC33",
                  backdropFilter: "blur(384px)",
                }}
              >
                <div className="rounded-full w-full h-full bg-[#0D0D0D] flex items-center justify-center p-6">
                  <div className="text-center max-w-[180px]">
                    <h3 className="text-2xl leading-7 tracking-[-1px] font-semibold mb-4 text-white">
                      {title}
                    </h3>
                    <p className="text-xs font-normal tracking-[-1px] leading-5 text-white">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex z-20 justify-center">
              <div className="flex-shrink-0 z-10 -mr-5 -mt-[52px]">
                <Image
                  src={image1}
                  alt="Pilates Practitioner 1"
                  width={200}
                  height={268}
                />
              </div>
              <div className="flex-shrink-0 z-10 -ml-5 -mt-[52px]">
                <Image
                  src={image2}
                  alt="Pilates Practitioner 2"
                  width={200}
                  height={268}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="flex items-center justify-center w-full">
            <div className="flex-shrink-0 z-10 -mr-16">
              <Image
                src={image1}
                alt="Pilates Practitioner 1"
                width={252}
                height={360}
                className="w-auto h-auto"
              />
            </div>
            <div className="flex items-center justify-center z-20 flex-shrink-0">
              <div
                className="rounded-full p-[2px] w-[500px] h-[500px]"
                style={{
                  background:
                    "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
                }}
              >
                <div className="rounded-full w-full h-full bg-[#0D0D0D] flex items-center justify-center p-12">
                  <div className="text-center max-w-[380px]">
                    <h3 className="text-5xl font-semibold mb-10 text-white leading-[56px] tracking-[-2px]">
                      {title}
                    </h3>
                    <p className="text-xl font-normal leading-[29px] tracking-[-1px] text-[#FFFFFF]">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 z-10 -ml-16">
              <Image
                src={image2}
                alt="Pilates Practitioner 2"
                width={252}
                height={360}
                className="w-auto h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoCircleSection;