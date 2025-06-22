import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";

const CardSection3 = ({ data }: { data: CardSection }) => {
  return (
    <section className=" px-[120px]">
      <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
      {data.description && (
        <p className="text-lg text-white/70 mb-8">{data.description}</p>
      )}
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1 row-span-2 h-full">
          <Card data={data.cardSection[0]} />
        </div>
        <div className="col-span-1 grid grid-rows-2 gap-8 h-full">
          <Card data={data.cardSection[1]} />
          <Card data={data.cardSection[2]} />
        </div>
      </div>
    </section>
  );
};

export default CardSection3;
