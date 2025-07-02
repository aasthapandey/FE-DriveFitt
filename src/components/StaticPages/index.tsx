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
  AppDownloadProps,
  FooterInfoProps,
  FooterProps,
  EvolutionSectionProps,
  FaqSectionProps,
  ScrollingCardSection as ScrollingCardSectionType,
  CountdownSection,
  ComingSoonSection as ComingSoonSectionType,
  Error404Section as Error404SectionType,
  PolicySection as PolicySectionType,
} from "@/types/staticPages";
import CardSection4 from "@/components/StaticPages/CardSection4";
import CardSection5 from "@/components/StaticPages/CardSection5";
import CardSection3 from "@/components/StaticPages/CardSection3";
import CardSection2 from "@/components/StaticPages/CardSection2";
import InnovationCommunity from "@/components/StaticPages/InnovationCommunity";
import GallerySection from "./GallerySection";
import SportsClub from "@/components/StaticPages/SportsClub";
import MemberSection from "@/components/StaticPages/MemberSection";
import AppDownload from "@/components/common/AppDownload";
import FooterInfo from "@/components/common/FooterInfo";
import Footer from "@/components/common/Footer";
import EvolutionSection from "@/components/StaticPages/EvolutionSection";
import Faq from "@/components/common/Faq";
import Banner from "@/components/common/Banner";
import ScrollingCardSection from "@/components/StaticPages/ScrollingCardSection";
import ComingSoonSection from "@/components/StaticPages/ComingSoonSection";
import Error404Section from "@/components/StaticPages/Error404Section";
import PolicySection from "@/components/StaticPages/PolicySection";

interface StaticPageProps {
  data: StaticPageData;
  pageName: string;
  isMobile?: boolean;
}

const StaticPage = ({ data, pageName, isMobile }: StaticPageProps) => {
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
      | AppDownloadProps
      | FooterInfoProps
      | FooterProps
      | EvolutionSectionProps
      | FaqSectionProps
      | ScrollingCardSectionType
      | CountdownSection
      | ComingSoonSectionType
      | Error404SectionType
      | PolicySectionType
  ) => {
    switch (key) {
      case "hero":
        return (
          <HeroSection
            data={value as Hero}
            pageName={pageName}
            isMobile={isMobile}
          />
        );
      case "comingSoonSection":
        return (
          <ComingSoonSection
            data={value as ComingSoonSectionType}
            isMobile={isMobile}
          />
        );
      case "error404Section":
        return (
          <Error404Section
            data={value as Error404SectionType}
            isMobile={isMobile}
          />
        );
      case "policySection":
        return (
          <PolicySection
            data={value as PolicySectionType}
          />
        );
      case "cardSection4":
        return <CardSection4 data={value as CardSection} isMobile={isMobile} />;
      case "cardSection3":
        return <CardSection3 data={value as CardSection} isMobile={isMobile} />;
      case "cardSection5":
        return <CardSection5 data={value as CardSection} isMobile={isMobile} />;
      case "cardSection2":
        return (
          <CardSection2 data={value as StaticCardProps} isMobile={isMobile} />
        );
      case "innovationCommunitySection":
        return (
          <InnovationCommunity
            data={value as InnovationCommunitySectionProps}
          />
        );
      case "evolutionSection":
        return <EvolutionSection data={value as EvolutionSectionProps} />;
      case "gallerySection":
        return <GallerySection data={value as GallerySectionProps} />;
      case "faqSection":
        return isMobile ? null : <Faq data={value as FaqSectionProps} />;
      case "sportsClubSection":
        return <SportsClub data={value as SportsClubSectionProps} />;
      case "bannerSection":
        return <Banner data={value as SportsClubSectionProps} />;
      case "memberSection":
        return (
          <MemberSection
            data={value as MemberSectionProps}
            isMobile={isMobile}
          />
        );
      case "appDownloadSection":
        return <AppDownload data={value as AppDownloadProps} />;
      case "footerInfoSection":
        return (
          <FooterInfo data={value as FooterInfoProps} isMobile={isMobile} />
        );
      case "footerSection":
        return <Footer data={value as FooterProps} isMobile={isMobile} />;
      case "scrollingCardSection":
        return (
          <ScrollingCardSection
            data={value as ScrollingCardSectionType}
            isMobile={isMobile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0D0D0D] flex flex-col gap-[60px] md:gap-[160px] w-full">
      {Object.entries(data).map(([key, value]) => {
        const component = renderComponent(key, value);
        if (component) {
          if (key === "hero") {
            return (
              <div
                key={key}
                className={`w-full ${
                  isMobile ? "bg-contain" : "bg-cover"
                } bg-center bg-no-repeat h-auto`}
                style={{
                  background: `url(${
                    isMobile
                      ? (value as Hero).mobileImage
                      : (value as Hero).desktopImage
                  })`,
                  backgroundPosition: isMobile ? "top center" : "center",
                  backgroundSize: isMobile ? "contain" : "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Navbar isMobile={isMobile} />
                {component}
              </div>
            );
          }
          if (key === "comingSoonSection") {
            return (
              <div key={key}
                className={`w-full ${
                  isMobile ? "bg-contain" : "bg-cover"
                } bg-center bg-no-repeat h-auto`}
              >
                <Navbar isMobile={isMobile} />
                {component}
              </div>
            );
          }
          if (key === "error404Section") {
            return (
              <div key={key} className="w-full">
                <Navbar isMobile={isMobile} />
                {component}
              </div>
            );
          }
          if (key === "policySection") {
            return (
              <div key={key} className="w-full">
                <Navbar isMobile={isMobile} />
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
