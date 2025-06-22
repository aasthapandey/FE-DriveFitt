import { StaticCardProps } from "@/types/staticPages";
import StaticCard from "@/components/StaticPages/StaticCard";

const CardSection2 = ({ data }: { data: StaticCardProps }) => {
  const { title, description, cardSection } = data;
  return (
    <section className="px-[120px] flex flex-col gap-5">
      <h2 className="text-5xl font-semibold leading-[56px] tracking-[-2px] text-center">
        {title}
      </h2>
      {description && (
        <p className="text-base font-light leading-5 tracking-[-1%] text-[#8A8A8A] text-center mb-[80px]">
          {description}
        </p>
      )}
      <div className="grid grid-cols-2 gap-10">
        <StaticCard data={cardSection[0]} />
        <StaticCard data={cardSection[1]} />
      </div>
    </section>
  );
};

export default CardSection2;
