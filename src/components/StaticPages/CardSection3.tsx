import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";

const CardSection3 = ({ data }: { data: CardSection }) => {
  return (
    <section className="px-20 py-16">
      <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
      {data.description && (
        <p className="text-lg text-white/70 mb-8">{data.description}</p>
      )}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {data.cardSection.slice(0, 2).map((card, idx) => (
          <Card data={card} key={idx} />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <Card data={data.cardSection[2]} key={2} />
        </div>
      </div>
    </section>
  );
};

export default CardSection3;
