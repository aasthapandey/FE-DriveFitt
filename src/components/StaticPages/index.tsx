import Navbar from "@/components/Navbar";
import HeroSection from "@/components/StaticPages/HeroSection";
import CardSection from "@/components/StaticPages/CardSection";
import { StaticPageData } from "@/types/staticPages";

interface StaticPageProps {
  data: StaticPageData;
  pageName: string;
}

const StaticPage = ({ data, pageName }: StaticPageProps) => {
  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: `url(${data.hero.desktopImage})` }}
      >
        <Navbar />
        <HeroSection data={data.hero} pageName={pageName} />
      </div>
      {data.cardSection && (
        <section className="px-20 py-16">
          {data.cardSection.map((card, idx) => (
            <CardSection data={card} key={idx} />
          ))}
        </section>
      )}
    </div>
  );
};

export default StaticPage;
