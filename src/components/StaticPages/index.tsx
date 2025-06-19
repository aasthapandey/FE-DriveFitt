import Navbar from "@/components/Navbar";
import HeroSection from "@/components/StaticPages/HeroSection";
import { StaticPageData } from "@/types/staticPages";
import CardSection4 from "@/components/StaticPages/CardSection4";
import CardSection5 from "@/components/StaticPages/CardSection5";
import CardSection3 from "@/components/StaticPages/CardSection3";

interface StaticPageProps {
  data: StaticPageData;
  pageName: string;
}

const StaticPage = ({ data, pageName }: StaticPageProps) => {
  let CardSectionComponent = null;
  if (data.cardSection4) {
    CardSectionComponent = <CardSection4 data={data.cardSection4} />;
  } else if (data.cardSection3) {
    CardSectionComponent = <CardSection3 data={data.cardSection3} />;
  } else if (data.cardSection5) {
    CardSectionComponent = <CardSection5 data={data.cardSection5} />;
  }

  return (
    <div className="bg-[#0D0D0D]">
      <div
        className="bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: `url(${data.hero.desktopImage})` }}
      >
        <Navbar />
        <HeroSection data={data.hero} pageName={pageName} />
      </div>

      <div>{CardSectionComponent}</div>
    </div>
  );
};

export default StaticPage;
