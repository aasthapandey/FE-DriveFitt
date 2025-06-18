type HeroSectionProps = {
  data: {
    title: string;
    description: string;
    desktopImage?: string;
    mobileImage?: string;
    btnPrimaryText?: string;
    btnSecondaryText?: string;
  };
};

const HeroSection = ({ data }: HeroSectionProps) => {
  return (
    <div className="h-[857px] flex flex-col justify-center px-20">
      <div className="max-w-[600px]">
        <h1 className="text-white text-6xl font-bold mb-6">{data.title}</h1>
        <p className="text-white text-xl mb-8">{data.description}</p>
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
