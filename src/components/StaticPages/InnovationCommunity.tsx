import { InnovationCommunitySectionProps } from "@/types/staticPages";
import InfoCard from "@/components/StaticPages/InfoCard";
import TitleDescription from "@/components/common/TitleDescription";

const InnovationCommunity = ({
  data,
}: {
  data: InnovationCommunitySectionProps;
}) => {
  const { title, description, infoSection } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5 ">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="grid grid-rows-3 md:grid-rows-none md:grid-cols-3 gap-5 md:gap-10">
        {infoSection.map((item) => (
          <InfoCard key={item.title} data={item} />
        ))}
      </div>
    </section>
  );
};

export default InnovationCommunity;
