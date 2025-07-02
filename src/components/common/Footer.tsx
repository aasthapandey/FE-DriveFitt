import Image from "next/image";
import Link from "next/link";
import { FooterProps } from "@/types/staticPages";

const Footer = ({
  data,
  isMobile,
}: {
  data: FooterProps;
  isMobile?: boolean;
}) => {
  const { logo, description, sections, socialLinks, copyright } = data;

  return (
    <footer className="bg-[#1A1A1A] text-white w-full">
      <div className="container mx-auto px-4 md:px-0 md:pt-[60px] md:pb-[47px] pb-6 pt-12">
        <div className="flex md:flex-row flex-col md:gap-[106px] gap-12">
          <div className="w-full md:w-[290px] h-auto">
            <Image
              src={logo}
              alt="DriveFitt"
              width={212}
              height={36}
              className="md:w-[212px] md:h-9 w-[188px] h-8 mb-6 md:mb-[26px]"
            />
            <p className="text-[#FFFFFF] md:text-[#EAECF0] max-w-md text-base tracking-[0%] font-normal md:text-base md:leading-5">
              {description}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:mb-10 mb-8 w-full">
            {sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-base font-normal leading-5 mb-4 text-[#9A9A9A]">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.link}
                        className="text-white hover:text-[#EAECF0] text-base leading-6 md:leading-10 font-medium tracking-[0%] md:tracking-[-2%] transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center md:pt-[41px] pt-6 border-t border-[#333333]">
          {isMobile ? null : (
            <p className="text-[#8A8A8A] mb-0 md:text-base">{copyright}</p>
          )}
          <div className="flex space-x-6 md:space-x-8 mb-4 md:mb-0">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                target="_blank"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src={social.image}
                  alt="social"
                  width={24}
                  height={24}
                  className="size-5 md:size-6"
                />
              </Link>
            ))}
          </div>
          {isMobile ? (
            <p className="text-[#8A8A8A] mb-4 text-xs">{copyright}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
