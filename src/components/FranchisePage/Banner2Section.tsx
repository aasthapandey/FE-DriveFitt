import { Banner2SectionType } from "@/types/franchisePage";

interface Banner2SectionProps {
  data: Banner2SectionType;
  isMobile?: boolean;
}

const Banner2Section = ({ data }: Banner2SectionProps) => {
  const { title, description } = data;
  return (
    <div className="w-full px-6 md:px-[120px] mt-[39px] md:mt-0">
      <div
        className="w-full items-center justify-center text-center  md:text-left h-fit rounded-[30px] border-[2px] border-[#333333] p-5 md:py-[38px] md:px-[245px] flex md:gap-[60px] md:flex-row flex-col gap-[30px]"
        style={{
          background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
        }}
      >
        <div className="flex flex-col gap-3 md:gap-4">
          <h2 className="text-2xl md:text-5xl font-semibold leading-7 md:leading-[56px] tracking-[-1px] md:tracking-[-2px] text-center">
            {title}
          </h2>
          <p className="text-xs md:text-base font-light leading-4 md:leading-5 tracking-[-1%] text-[#8A8A8A] text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner2Section;
