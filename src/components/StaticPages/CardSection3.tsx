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
              className={`${idx === 0 ? "h-[372px]" : "h-[176px]"}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          <div className="col-span-1 row-span-2 h-full">
            <Card data={cardSection[0]} className="!h-full" />
          </div>
          <div className="col-span-1 grid grid-rows-2 gap-8 h-full">
            <Card data={cardSection[1]} />
            <Card data={cardSection[2]} />
          </div>
        </div>
      )}
    </section>
  );
};

export default CardSection3;
