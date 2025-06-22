import { CardSection } from "@/types/staticPages";
import Card from "@/components/StaticPages/Card";

const CardSection4 = ({ data }: { data: CardSection }) => {
  return (
    <section className="px-[120px] py-16">
      <h2 className="w-full max-w-[659px] h-auto min-h-[112px] text-3xl md:text-[48px] font-semibold leading-tight md:leading-[56px] tracking-[-1px] md:tracking-[-2px] text-center text-white flex items-center justify-center px-4 justify-self-center mb-4 mt-[120px]">
        {data.title}
      </h2>
      {data.description && (
        <p className="w-full max-w-[703px] h-auto min-h-[20px] text-base font-light leading-5 tracking-[-0.16px] text-center text-[#8A8A8A] mx-auto mb-[68px] justify-self-center">
        {data.description}
      </p>
      )}
      <div className="grid grid-cols-2 grid-rows-2 gap-[40px]">
        {data.cardSection.map((card, idx) => (
          <Card data={card} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default CardSection4;
