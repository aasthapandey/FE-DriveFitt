import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";

const CardSection3 = ({ data }: { data: CardSection }) => {
  return (
    <section className="px-[120px] py-[80px]">
      <h2 className="w-full max-w-[314px] h-auto min-h-[56px] text-3xl md:text-[48px] font-semibold leading-tight md:leading-[56px] tracking-[-1px] md:tracking-[-2px] text-center text-white flex items-center justify-center justify-self-center mb-4">{data.title}</h2>
      {data.description && (
        <p className="w-full max-w-[703px] h-auto min-h-[20px] text-base font-light leading-5 tracking-[-0.16px] text-center text-[#8A8A8A] mx-auto mb-[68px] justify-self-center">{data.description}</p>
      )}
      <div className="grid grid-cols-2 gap-8 h-[407px]">
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
