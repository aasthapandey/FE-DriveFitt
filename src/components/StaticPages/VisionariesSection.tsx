import { FranchiseCardSection } from "@/types/franchisePage";
import TitleDescription from "@/components/common/TitleDescription";
import VisionCard from "@/components/StaticPages/VisionCard";
import ScrollAnimation from "@/components/common/ScrollAnimation";

interface VisionarySectionProps {
  data: FranchiseCardSection;
  isMobile?: boolean;
}

const VisionarySection = ({ data, isMobile }: VisionarySectionProps) => {
  const { title, description, cardList } = data;
  const list = isMobile
    ? [
        cardList[0],
        cardList[1],
        cardList[3], // swap: 4th item goes to 3rd position
        cardList[2], // swap: 3rd item goes to 4th position
        ...cardList.slice(4), // rest of the items if any
      ]
    : cardList;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <ScrollAnimation delay={0.2} direction="up">
        <TitleDescription title={title || ""} description={description || ""} />
      </ScrollAnimation>
      <div className="flex flex-col items-center text-center gap-12">
        <div className="flex flex-col w-full gap-[16px]">
          {/* First row - 2 cards on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <ScrollAnimation delay={0.3} direction="up">
              <VisionCard
                card={list[0]}
                className="w-full"
                isMobile={isMobile}
              />
            </ScrollAnimation>
            <ScrollAnimation delay={0.4} direction="up">
              <VisionCard
                card={list[1]}
                className="w-full"
                isMobile={isMobile}
              />
            </ScrollAnimation>
          </div>
          {/* Second row - 3 cards on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            <ScrollAnimation delay={0.5} direction="up">
              <VisionCard
                card={list[2]}
                className="w-full"
                isMobile={isMobile}
              />
            </ScrollAnimation>
            <ScrollAnimation delay={0.6} direction="up">
              <VisionCard
                card={list[3]}
                className="w-full"
                isMobile={isMobile}
              />
            </ScrollAnimation>
            <ScrollAnimation delay={0.7} direction="up">
              <VisionCard
                card={list[4]}
                className="w-full"
                isMobile={isMobile}
              />
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionarySection;
