import Navbar from "@/components/common/Navbar";
import {
  FranchisePageData,
  FranchiseHero,
  BannerSection,
  CardSection,
  ImageCardSection,
  Banner2SectionType,
} from "@/types/franchisePage";
import { FooterInfoProps, FooterProps } from "@/types/staticPages";
import FooterInfo from "@/components/common/FooterInfo";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/FranchisePage/HeroSection";
import Banner1Section from "@/components/FranchisePage/Banner1Section";
import MultiRevenueSection from "@/components/FranchisePage/MultiRevenueSection";
import OpportunitySection from "@/components/FranchisePage/OpportunitySection";
import WhatYouReceiveSection from "@/components/FranchisePage/WhatYouReceiveSection";
import WhoLookingForSection from "@/components/FranchisePage/WhoLookingForSection";
import Banner2Section from "@/components/FranchisePage/Banner2Section";
import NextStepSection from "@/components/FranchisePage/NextStepSection";

interface FranchisePageProps {
  data: FranchisePageData;
  pageName: string;
  isMobile?: boolean;
}

const FranchisePage = ({ data, pageName, isMobile }: FranchisePageProps) => {
  const renderComponent = (
    key: string,
    value:
      | FranchiseHero
      | BannerSection
      | CardSection
      | ImageCardSection
      | Banner2SectionType
      | FooterInfoProps
      | FooterProps
  ) => {
    switch (key) {
      case "hero":
        return (
          <HeroSection
            data={value as FranchiseHero}
            pageName={pageName}
            isMobile={isMobile}
          />
        );
      case "banner1Section":
        return (
          <Banner1Section data={value as BannerSection} isMobile={isMobile} />
        );
      case "multiRevenueSection":
        return (
          <MultiRevenueSection
            data={value as CardSection}
            isMobile={isMobile}
          />
        );
      case "opportunitySection":
        return (
          <OpportunitySection data={value as CardSection} isMobile={isMobile} />
        );
      case "whatYouReceiveSection":
        return (
          <WhatYouReceiveSection
            data={value as ImageCardSection}
            isMobile={isMobile}
          />
        );
      case "whatLookingForSection":
        return (
          <WhoLookingForSection
            data={value as CardSection}
            isMobile={isMobile}
          />
        );
      case "banner2Section":
        return (
          <Banner2Section
            data={value as Banner2SectionType}
            isMobile={isMobile}
          />
        );
      case "nextStepSection":
        return (
          <NextStepSection data={value as CardSection} isMobile={isMobile} />
        );
      case "footerInfoSection":
        return (
          <FooterInfo data={value as FooterInfoProps} isMobile={isMobile} />
        );
      case "footerSection":
        return <Footer data={value as FooterProps} isMobile={isMobile} />;
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
                className={`w-full bg-center bg-no-repeat h-auto`}
                style={{
                  background: `url(${
                    isMobile
                      ? (value as FranchiseHero).mobileImage
                      : (value as FranchiseHero).desktopImage
                  })`,
                  backgroundPosition: isMobile ? "center center" : "top center",
                  backgroundSize: isMobile ? "contain" : "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
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

export default FranchisePage;
