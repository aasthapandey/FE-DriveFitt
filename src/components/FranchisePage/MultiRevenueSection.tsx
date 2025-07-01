import { CardSection } from "@/types/franchisePage";
import TitleDescription from "@/components/common/TitleDescription";
import MultiRevenueCard from "@/components/FranchisePage/MultiRevenueCard";

interface MultiRevenueSectionProps {
  data: CardSection;
  isMobile?: boolean;
}

const MultiRevenueSection = ({ data, isMobile }: MultiRevenueSectionProps) => {
  const { title, description, cardList } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="flex flex-col items-center text-center gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 w-full">
          {cardList.map((card, index) => (
            <MultiRevenueCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MultiRevenueSection;
