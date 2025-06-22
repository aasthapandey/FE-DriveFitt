import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";

const CardSection5 = ({ data }: { data: CardSection }) => {
  return (
    <section className=" px-[120px]">
      <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
      {data.description && (
        <p className="text-lg text-white/70 mb-8">{data.description}</p>
      )}
      <div className="grid grid-cols-3 gap-8 mb-8">
        {data.cardSection.slice(0, 3).map((card, idx) => (
          <Card data={card} key={idx} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-8">
        {data.cardSection.slice(3, 5).map((card, idx) => (
          <Card data={card} key={idx + 3} />
        ))}
      </div>
    </section>
  );
};

export default CardSection5;
