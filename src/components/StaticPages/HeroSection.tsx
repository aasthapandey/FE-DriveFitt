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
  return <div>
    <h1>{data.title}</h1>
    <p>{data.description}</p>
    {data.desktopImage && (
      <img src={data.desktopImage} alt={data.title} />
    )}
    {data.btnPrimaryText && <button>{data.btnPrimaryText}</button>}
    {data.btnSecondaryText && data.btnSecondaryText !== "" && <button>{data.btnSecondaryText}</button>}
  </div>;
};

export default HeroSection;