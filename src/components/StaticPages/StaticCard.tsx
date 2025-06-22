import { StaticCardType } from "@/types/staticPages";
import Image from "next/image";

const StaticCard = ({ data }: { data: StaticCardType }) => {
  const { title, description, backgroundImage, link, modalImage, className } =
    data;
  return (
    <a href={link}>
      <div
        className={`rounded-[40px] p-[2px] h-[407px] ${className}`}
        style={{
          background:
            "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
        }}
      >
        <div
          className="rounded-[40px] bg-[#0D0D0D] w-full h-full cursor-pointer flex flex-col justify-end relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`absolute top-0 h-full ${
              title === "protein bar"
                ? "right-[3%] top-[-10%] max-h-[440px] w-[244px]"
                : "right-[-5%] top-[-9%] max-h-[440px] w-[412px]"
            }`}
            style={{
              height: title === "protein bar" ? "440px" : "430px",
            }}
          >
            <Image
              src={modalImage || ""}
              alt="modal"
              width={title === "protein bar" ? 244 : 412}
              height={title === "protein bar" ? 440 : 430}
              className="h-full w-full object-contain object-right"
              style={{
                objectPosition: "right center",
              }}
            />
          </div>
          <div className="flex justify-between items-end p-10 relative z-10">
            <div className="flex flex-col justify-start w-3/5 gap-4">
              <h3 className="text-white text-[32px] tracking-[-1px] leading-9 font-semibold">
                <div>The</div>
                <div>{title}</div>
              </h3>
              <p className="text-white text-base tracking-[-2%] leading-[100%] font-light">
                {description}
              </p>
            </div>
            <div>
              <Image
                src="/images/redirectionButton.svg"
                alt="redirectionBtn"
                width={48}
                height={48}
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default StaticCard;
