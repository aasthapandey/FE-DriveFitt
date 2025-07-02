import { CardSection } from "@/types/franchisePage";
import TitleDescription from "@/components/common/TitleDescription";
import OpportunityCard from "@/components/FranchisePage/OpportunityCard";

interface OpportunitySectionProps {
  data: CardSection;
  isMobile?: boolean;
}

const OpportunitySection = ({ data, isMobile }: OpportunitySectionProps) => {
  const { title, description, cardList } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="flex flex-col items-center text-center gap-12">
        {isMobile ? (
          <div className="flex flex-col gap-4 w-full">
            {cardList.map((card, index) => {
              return (
                <OpportunityCard 
                  key={index} 
                  card={card} 
                  className="w-full"
                  isHorizontal={index > 2} 
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col w-full gap-8">
            {/* First row - equal widths */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <OpportunityCard card={cardList[0]} className="w-full" />
              <OpportunityCard card={cardList[1]} className="w-full" />
              <OpportunityCard card={cardList[2]} className="w-full" />
            </div>
            {/* Second row - two equal width cards with horizontal layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <OpportunityCard card={cardList[3]} className="w-full" isHorizontal={true} />
              <OpportunityCard card={cardList[4]} className="w-full" isHorizontal={true} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OpportunitySection;
