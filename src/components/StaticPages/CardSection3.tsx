import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";
import TitleDescription from "@/components/common/TitleDescription";

const CardSection3 = ({
  data,
  isMobile,
}: {
  data: CardSection;
  isMobile?: boolean;
}) => {
  const { title, description, cardSection } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      {isMobile ? (
        <div className="flex flex-col w-full gap-4">
          {cardSection.map((card, idx) => (
            <Card
              data={card}
              key={idx}
              className={`${idx === 0 ? "!h-[372px]" : "!h-[176px]"}`}
              imageClass={`${idx === 0 ? "!h-[368px]" : "!h-[172px]"}`}
            />
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
