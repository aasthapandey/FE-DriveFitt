import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/StaticPages/HeroSection";
import {
  StaticPageData,
  Hero,
  AppDownloadProps,
  FooterInfoProps,
  FooterProps,
} from "@/types/staticPages";
import AppDownload from "@/components/common/AppDownload";
import FooterInfo from "@/components/common/FooterInfo";
import Footer from "@/components/common/Footer";
import ChatWithUs from "@/components/common/ChatWithUs";
import ContactForm from "@/components/common/ContactForm";

interface StaticPageProps {
  data: StaticPageData;
  pageName: string;
  isMobile?: boolean;
}

const ContactUsPage = ({ data, pageName, isMobile }: StaticPageProps) => {
  const {
    title,
    description,
    hero,
    appDownloadSection,
    footerInfoSection,
    footerSection,
  } = data;
  const { footerInfoList, socialLinkList, contactFormSection } =
    footerInfoSection as FooterInfoProps;

  return (
    <div className="bg-[#0D0D0D] flex flex-col w-full">
      <div
        className={`w-full ${
          isMobile ? "bg-contain" : "bg-cover"
        } bg-center bg-no-repeat h-auto`}
        style={{
          background: `url(${isMobile ? hero.mobileImage : hero.desktopImage})`,
          backgroundPosition: "top center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar isMobile={isMobile} />

        <div className="mt-[108px]">
          <div className="flex flex-col gap-3 md:gap-[18px] ">
            <h1 className="md:px-[120px] px-6 text-[40px] md:text-[68px] text-center md:text-left font-bold text-white flex tracking-[-2px] leading-[44px] md:leading-[72px]">
              {hero.title}
            </h1>
            <p className="md:px-[120px] px-6text-sm leading-5 md:text-xl text-center md:text-left tracking-[2%] text-white font-light mb-5 md:mb-[45px]">
              {hero.description}
            </p>
            <div className="flex flex-col md:gap-[120px] gap-[40px]">
              <div className="md:px-[120px] mb-5 md:mb-0 px-6 flex flex-col md:flex-row gap-4 md:gap-10 justify-start md:justify-between h-fit w-full">
                <div className="w-full md:w-2/5 max-h-full">
                  <ChatWithUs
                    footerInfoList={footerInfoList}
                    socialLinkList={socialLinkList}
                  />
                </div>
                <div className="w-full md:w-3/5 h-full">
                  <ContactForm data={contactFormSection} />
                </div>
              </div>
              <AppDownload data={appDownloadSection as AppDownloadProps} />
              <Footer data={footerSection as FooterProps} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
