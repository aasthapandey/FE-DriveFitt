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
          className="rounded-[40px] bg-[#0D0D0D] w-full h-full cursor-pointer flex flex-col justify-end relative overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute right-0 top-0 h-full max-h-[440px] max-w-[412px]">
            <Image
              src={modalImage || ""}
              alt="modal"
              width={`${title === "The Protein BAR" ? 244 : 412}`}
              height={`${title === "The Protein BAR" ? 440 : 430}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-between items-end p-10 relative z-10">
            <div className="flex flex-col justify-start w-3/5 gap-4">
              <h3 className="text-white text-[32px] font-semibold">{title}</h3>
              <p className="text-white text-base font-light">{description}</p>
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
