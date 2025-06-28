import Image from "next/image";
import Link from "next/link";
import { FooterProps } from "@/types/staticPages";

const Footer = ({ data }: { data: FooterProps }) => {
  const { logo, description, sections, socialLinks, copyright } = data;

  return (
    <footer className="bg-[#1A1A1A] text-white w-full">
      <div className="container mx-auto px-4 py-16">
        {/* Logo and Description */}
        <div className="mb-12">
          <Image
            src={logo}
            alt="DriveFitt"
            width={150}
            height={40}
            className="mb-4"
          />
          <p className="text-[#8A8A8A] max-w-md">{description}</p>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.link}
                      className="text-[#8A8A8A] hover:text-white transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#333333]">
          <p className="text-[#8A8A8A] mb-4 md:mb-0">{copyright}</p>
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.link || "#"}
                className="hover:opacity-80 transition-opacity"
              >
                <Image src={social.image} alt="social" width={24} height={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
