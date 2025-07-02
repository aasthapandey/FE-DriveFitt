import { StaticCardProps } from "@/types/staticPages";
import StaticCard from "@/components/StaticPages/StaticCard";
import TitleDescription from "@/components/common/TitleDescription";

const CardSection2 = ({
  data,
  isMobile,
}: {
  data: StaticCardProps;
  isMobile?: boolean;
}) => {
  const { title, description, cardSection } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      {isMobile ? (
        <div className="flex flex-col w-full gap-4">
          {data.cardSection.map((card, idx) => (
            <StaticCard
              data={card}
              key={idx}
              className="h-[256px] md:h-[407px]"
              isMobile={isMobile}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          <StaticCard
            data={cardSection[0]}
            className="h-[256px] md:h-[407px]"
            isMobile={isMobile}
          />
          <StaticCard
            data={cardSection[1]}
            className="h-[256px] md:h-[407px]"
            isMobile={isMobile}
          />
        </div>
      )}
    </section>
  );
};

export default CardSection2;
