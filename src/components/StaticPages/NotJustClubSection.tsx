import { NotJustClubSectionProps } from "@/types/staticPages";
import Image from "next/image";

const NotJustClubSection = ({
  data,
  isMobile,
}: {
  data: NotJustClubSectionProps;
  isMobile?: boolean;
}) => {
  const { title, bgImg, list } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5 ">
      <div
        className="rounded-[20px] md:rounded-[40px] p-[2px] h-[256px] md:h-[364px]"
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[20px] md:rounded-[40px] bg-[#0D0D0D] w-full h-full flex flex-col justify-center relative"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex px-[92px] gap-6 items-center justify-center">
            <h1 className="text-5xl font-semibold leading-[56px] tracking-[-2px]">
              {title}
            </h1>
            <div className="flex flex-col gap-7">
              {list.map((item) => {
                return (
                  <div className="flex gap-6 items-center">
                    <Image
                      src={item.icon}
                      alt={item.description}
                      width={60}
                      height={60}
                      className="size-10 md:size-[60px]"
                    />
                    <span className="text-[#00DBDC] text-5xl font-semibold leading-[56px] tracking-[-2px]">
                      {item.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotJustClubSection;
