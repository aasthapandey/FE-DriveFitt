import { Hero } from "@/types/staticPages";

interface HeroSectionProps {
  data: Hero;
  pageName?: string;
}

const HeroSection = ({ data, pageName }: HeroSectionProps) => {
  const { title, description, btnPrimaryText, btnSecondaryText } = data;
  const renderTitle = () => {
    if (pageName === "home") {
      return (
        <h1 className="text-white text-6xl font-bold mb-4">
          {title}
          <span className="text-[#00DBDC] italic">STRIVE</span>
        </h1>
      );
    } else if (pageName === "cricket") {
      return (
        <h1 className="text-white text-6xl font-bold mb-4">
          <span className="text-[#00DBDC] italic">DRIVE:</span>
          {title}
        </h1>
      );
    } else {
      return <h1 className="text-white text-6xl font-bold mb-4">{title}</h1>;
    }
  };
  return (
    <div className="h-[857px] flex flex-col justify-center px-20">
      <div
        className={`${
          pageName === "cricket" ? "max-w-[739px]" : "max-w-[600px]"
        } `}
      >
        {renderTitle()}
        <p className="text-white text-base mb-[60px]">{data.description}</p>
        <div className="flex gap-4">
          {data.btnPrimaryText && (
            <button className="bg-[#00DBDC] text-[#0D0D0D] px-10 py-3 rounded-lg font-medium">
              {data.btnPrimaryText}
            </button>
          )}
          {data.btnSecondaryText && data.btnSecondaryText !== "" && (
            <button className="border border-[#00DBDC] text-[#00DBDC] px-10 py-3 rounded-lg font-medium">
              {data.btnSecondaryText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
