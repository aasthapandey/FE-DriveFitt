import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/StaticPages/HeroSection";
import { StaticPageData } from "@/types/staticPages";
import CardSection4 from "@/components/StaticPages/CardSection4";
import CardSection5 from "@/components/StaticPages/CardSection5";
import CardSection3 from "@/components/StaticPages/CardSection3";
import CarouselBannerSection from "@/components/StaticPages/CarouselBannerSection";
import CardSection2 from "@/components/StaticPages/CardSection2";

interface StaticPageProps {
  data: StaticPageData;
  pageName: string;
}

const componentMap: Record<string, any> = {
  hero: (data: any, pageName: string) => (
    <HeroSection data={data} pageName={pageName} />
  ),
  carouselBanner: () => <CarouselBannerSection />,
  cardSection4: (data: any) => <CardSection4 data={data} />,
  cardSection3: (data: any) => <CardSection3 data={data} />,
  cardSection2: () => <CardSection2 />,
  cardSection5: (data: any) => <CardSection5 data={data} />,
};

const StaticPage = ({ data, pageName }: StaticPageProps) => {
  return (
    <div className="bg-[#0D0D0D]">
      {Object.entries(data).map(([key, value]) => {
        if (componentMap[key]) {
          if (key === "hero") {
            return (
              <div
                key={key}
                className="bg-cover bg-center bg-no-repeat w-full"
                style={{ backgroundImage: `url(${value.desktopImage})` }}
              >
                <Navbar />
                {componentMap[key](value, pageName)}
              </div>
            );
          }
          return <div key={key}>{componentMap[key](value)}</div>;
        }
        return null;
      })}
    </div>
  );
};

export default StaticPage;
