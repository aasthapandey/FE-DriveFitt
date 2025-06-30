import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";
import TitleDescription from "@/components/common/TitleDescription";
import CardInfo from "@/components/StaticPages/CardInfo";
import Image from "next/image";
import CardInfoItem from "@/components/StaticPages/CardInfoItem";

const CardSection5 = ({
  data,
  isMobile,
}: {
  data: CardSection;
  isMobile?: boolean;
}) => {
  const { title, description, cardSection } = data;
  return (
    <section className="md:px-[120px] px-4 flex flex-col gap-8">
      <TitleDescription title={title || ""} description={description || ""} />
      {isMobile ? (
        <div
          className="rounded-[20px] md:rounded-[40px] p-[2px] h-[548px]"
          style={{
            background:
              "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
          }}
        >
          <div
            className="rounded-[20px] md:rounded-[40px] w-full h-full cursor-pointer flex flex-col justify-center"
            style={{
              background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
            }}
          >
            {cardSection.map((card, idx) => {
              return (
                <div key={idx} className="flex flex-col">
                  <CardInfoItem data={card} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 w-full h-[722px]">
          <div className="flex flex-col gap-10">
            <Card
              data={cardSection[0]}
              className="!h-[406px]"
              imageClass="!h-[402px]"
            />
            <CardInfo data={cardSection[1]} className="!h-[276px]" />
          </div>
          <div className="flex flex-col">
            <Card
              data={cardSection[2]}
              className="!h-[722px]"
              imageClass="!h-[718px]"
            />
          </div>
          <div className="flex flex-col gap-10">
            <CardInfo data={cardSection[3]} className="!h-[276px]" />
            <Card
              data={cardSection[4]}
              className="!h-[406px]"
              imageClass="!h-[402px]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CardSection5;
