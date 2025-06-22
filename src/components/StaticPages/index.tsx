import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/StaticPages/HeroSection";
import {
  StaticPageData,
  Hero,
  CardSection,
  CarouselBanner,
  StaticCardProps,
  InnovationCommunitySectionProps,
  GallerySectionProps,
  SportsClubSectionProps,
  MemberSectionProps,
} from "@/types/staticPages";
import CardSection4 from "@/components/StaticPages/CardSection4";
import CardSection5 from "@/components/StaticPages/CardSection5";
import CardSection3 from "@/components/StaticPages/CardSection3";
// import CarouselBannerSection from "@/components/StaticPages/CarouselBannerSection";
import CardSection2 from "@/components/StaticPages/CardSection2";
import InnovationCommunity from "@/components/StaticPages/InnovationCommunity";
import GallerySection from "./GallerySection";
import SportsClub from "@/components/StaticPages/SportsClub";
import MemberSection from "@/components/StaticPages/MemberSection";

interface StaticPageProps {
  data: StaticPageData;
  pageName: string;
}

const StaticPage = ({ data, pageName }: StaticPageProps) => {
  const renderComponent = (
    key: string,
    value:
      | Hero
      | CardSection
      | CarouselBanner[]
      | StaticCardProps
      | InnovationCommunitySectionProps
      | GallerySectionProps
      | SportsClubSectionProps
      | MemberSectionProps
  ) => {
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
      case "cardSection2":
        return <CardSection2 data={value as StaticCardProps} />;
      case "innovationCommunitySection":
        return (
          <InnovationCommunity
            data={value as InnovationCommunitySectionProps}
          />
        );
      case "gallerySection":
        return <GallerySection data={value as GallerySectionProps} />;
      case "sportsClubSection":
        return <SportsClub data={value as SportsClubSectionProps} />;
      case "memberSection":
        return <MemberSection data={value as MemberSectionProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0D0D0D] flex flex-col gap-[160px] pb-[120px]">
      {Object.entries(data).map(([key, value]) => {
        const component = renderComponent(key, value);
        if (component) {
          if (key === "hero") {
            return (
              <div
                key={key}
                className="bg-cover bg-center bg-no-repeat w-full"
                style={{
                  backgroundImage: `url(${(value as Hero).desktopImage})`,
                }}
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
