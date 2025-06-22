import { InnovationCommunitySectionProps } from "@/types/staticPages";
import InfoCard from "@/components/StaticPages/InfoCard";

const InnovationCommunity = ({
  data,
}: {
  data: InnovationCommunitySectionProps;
}) => {
  const { title, description, infoSection } = data;
  return (
    <section className="px-[120px] flex flex-col gap-5">
      <h2 className="text-5xl font-semibold leading-[56px] tracking-[-2px] text-center">
        {title}
      </h2>
      {description && (
        <p className="text-base font-light leading-5 tracking-[-1%] text-[#8A8A8A] text-center mb-[52px]">
          {description}
        </p>
      )}
      <div className="grid grid-cols-3 gap-10">
        {infoSection.map((item) => (
          <InfoCard key={item.title} data={item} />
        ))}
      </div>
    </section>
  );
};

export default InnovationCommunity;
