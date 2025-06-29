import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";
import TitleDescription from "@/components/common/TitleDescription";

const CardSection4 = ({
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
            <Card data={card} key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 grid-rows-2 gap-[40px]">
          {cardSection.map((card, idx) => (
            <Card data={card} key={idx} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CardSection4;
