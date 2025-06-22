import { StaticCardProps } from "@/types/staticPages";
import StaticCard from "@/components/StaticPages/StaticCard";

const CardSection2 = ({ data }: { data: StaticCardProps }) => {
  return (
    <section className="px-[120px]">
      <h2 className="text-4xl font-bold mb-2">{data.title}</h2>
      {data.description && (
        <p className="text-lg text-white/70 mb-8">{data.description}</p>
      )}
      <div className="grid grid-cols-2 gap-10">
        <StaticCard data={data.cardSection[0]} />
        <StaticCard data={data.cardSection[1]} />
      </div>
    </section>
  );
};

export default CardSection2;
