import { FooterInfoProps } from "@/types/staticPages";
import ChatWithUs from "@/components/common/ChatWithUs";
import ContactForm from "@/components/common/ContactForm";

const FooterInfo = ({ data }: { data: FooterInfoProps }) => {
  const { footerInfoList, socialLinkList, contactFormSection } = data;

  return (
    <>
      <ChatWithUs
        footerInfoList={footerInfoList}
        socialLinkList={socialLinkList}
      />
      <ContactForm data={contactFormSection} />
    </>
  );
};

export default FooterInfo;
