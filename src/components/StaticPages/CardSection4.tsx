import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";

const CardSection4 = ({ data }: { data: CardSection }) => {
  return (
    <section className="px-[120px]">
      <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
      {data.description && (
        <p className="text-lg text-white/70 mb-8">{data.description}</p>
      )}
      <div className="grid grid-cols-2 grid-rows-2 gap-8">
        {data.cardSection.map((card, idx) => (
          <Card data={card} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default CardSection4;
