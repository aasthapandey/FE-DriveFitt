import { CardSection, CardType } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";

const CardSection3 = ({
  data,
  isMobile,
}: {
  data: CardSection;
  isMobile?: boolean;
}) => {
  const { title, description, cardSection } = data;

  const CustomMobileCard = ({
    card,
    index,
  }: {
    card: CardType;
    index: number;
  }) => (
    <div
      className={`rounded-[20px] p-[2px] ${
        index === 0 ? "h-[372px]" : "h-[176px]"
      }`}
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <a
        href={card.link}
        className={`relative block rounded-[20px] overflow-hidden w-full ${
          index === 0 ? "h-[368px]" : "h-[172px]"
        }`}
        style={{
          backgroundImage: `url(${card.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        <div className="absolute left-0 bottom-0 w-full pb-6 px-6 flex justify-between items-end">
          <div className="flex flex-col">
            <h3
              className="text-white font-semibold"
              style={{
                fontFamily: "Inter",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "-1px",
              }}
            >
              {card.title}
            </h3>
          </div>

          {card.link && (
            <div className="flex items-end justify-end flex-shrink-0 -mb-[13px] -mr-[12px]">
              <Image
                src="https://da8nru77lsio9.cloudfront.net/images/redirectionButton.svg"
                alt="redirectionBtn"
                width={50}
                height={50}
                style={{
                  width: "50px",
                  height: "50px",
                  opacity: 1,
                }}
              />
            </div>
          )}
        </div>
      </a>
    </div>
  );

  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      {isMobile ? (
        <div className="flex flex-col w-full gap-4">
          {cardSection.map((card, idx) => (
            <CustomMobileCard card={card} index={idx} key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1 row-span-2 h-full">
            <Card
              data={cardSection[0]}
              className="!h-[660px]"
              imageClass="!h-[654px]"
            />
          </div>
          <div className="col-span-1 grid grid-rows-2 gap-10 h-full">
            <Card
              data={cardSection[1]}
              className="!h-[310px]"
              imageClass="!h-[306px]"
            />
            <Card
              data={cardSection[2]}
              className="!h-[310px]"
              imageClass="!h-[306px]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CardSection3;
