import { FooterInfoProps } from "@/types/staticPages";
import ChatWithUs from "@/components/common/ChatWithUs";
import ContactForm from "@/components/common/ContactForm";

const FooterInfo = ({ data }: { data: FooterInfoProps }) => {
  const { footerInfoList, socialLinkList, contactFormSection } = data;

  return (
    <div
      className="flex gap-6 px-[120px] pb-[40px] pt-[140px] h-fit w-full"
      style={{
        background: "linear-gradient(180deg, #1D1D1D 0%, #0D0D0D 100%)",
      }}
    >
      <div className="w-2/5 max-h-full">
        <ChatWithUs
          footerInfoList={footerInfoList}
          socialLinkList={socialLinkList}
        />
      </div>
      <div className="w-3/5 h-full">
        <ContactForm data={contactFormSection} />
      </div>
    </div>
  );
};

export default FooterInfo;
