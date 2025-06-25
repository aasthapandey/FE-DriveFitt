import { FooterInfoItem, SocialLinks } from "@/types/staticPages";
import Image from "next/image";

interface ChatWithUsProps {
  footerInfoList: FooterInfoItem[];
  socialLinkList: SocialLinks[];
}

const ChatWithUs = ({ footerInfoList, socialLinkList }: ChatWithUsProps) => {
  return (
    <div
      className="rounded-[40px] p-[2px] h-full"
      style={{
        background: "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
      }}
    >
      <div
        className="rounded-[40px] w-full h-full p-12 flex flex-col"
        style={{
          background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
        }}
      >
        {footerInfoList.map((item, index) => (
          <div
            key={item.title}
            className={`flex items-start gap-4 ${
              index !== footerInfoList.length - 1 ? "mb-12" : ""
            }`}
          >
            <div className="w-10 h-10 relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: "0px 7.2px 14.4px 0px #00DBDC33",
                }}
              >
                <div className="w-full h-full flex items-center justify-center bg-[#00DBDC] rounded-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={15}
                    height={15}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-[#8A8A8A] mb-2">{item.description}</p>
              <p className="text-base">{item.email}</p>
            </div>
          </div>
        ))}

        <div className="flex gap-6 mt-auto pt-8 border-t border-[#333333]">
          {socialLinkList.map((link) => (
            <a
              key={link.link}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Image src={link.image} alt="social" width={24} height={24} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWithUs;
