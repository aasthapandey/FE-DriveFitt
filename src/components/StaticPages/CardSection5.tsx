import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";
import TitleDescription from "@/components/common/TitleDescription";

const CardSection5 = ({
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
      <div className="grid grid-cols-3 gap-8 mb-8">
        {cardSection.slice(0, 3).map((card, idx) => (
          <Card
            data={card}
            key={idx}
            className={`${idx === 1 ? "!h-full" : ""}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-8">
        {cardSection.slice(3, 5).map((card, idx) => (
          <Card
            data={card}
            key={idx + 3}
          />
        ))}
      </div>
    </section>
  );
};

export default CardSection5;
