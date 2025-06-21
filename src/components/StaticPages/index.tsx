import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/StaticPages/HeroSection";
import { StaticPageData, Hero, CardSection, CarouselBanner } from "@/types/staticPages";
import CardSection4 from "@/components/StaticPages/CardSection4";
import CardSection5 from "@/components/StaticPages/CardSection5";
import CardSection3 from "@/components/StaticPages/CardSection3";
// import CarouselBannerSection from "@/components/StaticPages/CarouselBannerSection";
// import CardSection2 from "@/components/StaticPages/CardSection2";

interface StaticPageProps {
  data: StaticPageData;
  pageName: string;
}

const StaticPage = ({ data, pageName }: StaticPageProps) => {
  const renderComponent = (key: string, value: Hero | CardSection | CarouselBanner[]) => {
    switch (key) {
      case "hero":
        return <HeroSection data={value as Hero} pageName={pageName} />;
      case "cardSection4":
        return <CardSection4 data={value as CardSection} />;
      case "cardSection3":
        return <CardSection3 data={value as CardSection} />;
      case "cardSection5":
        return <CardSection5 data={value as CardSection} />;
      // case "carouselBanner":
      //   return <CarouselBannerSection data={value as CarouselBanner[]} />;
      // case "cardSection2":
      //   return <CardSection2 data={value as CardSection} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0D0D0D]">
      {Object.entries(data).map(([key, value]) => {
        const component = renderComponent(key, value);
        if (component) {
          if (key === "hero") {
            return (
              <div
                key={key}
                className="bg-cover bg-center bg-no-repeat w-full"
                style={{ backgroundImage: `url(${(value as Hero).desktopImage})` }}
              >
                <Navbar />
                {component}
              </div>
            );
          }
          return <div key={key}>{component}</div>;
        }
        return null;
        
      })}
    </div>
  );
};

export default StaticPage;
