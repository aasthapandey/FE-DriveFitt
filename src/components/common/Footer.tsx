import { FooterProps } from "@/types/staticPages";

const Footer = ({ data }: { data: FooterProps }) => {
  const { title } = data;
  return (
    <div className="bg-[#333333] text-[#8A8A8A] w-full h-[100px] my-[-150px] flex px-[120px] justify-start items-center">
      {title}
    </div>
  );
};

export default Footer;
