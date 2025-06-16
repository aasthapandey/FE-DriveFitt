type CardSectionProps = {
  data: {
    title: string;
    description: string;
    backgroundImage?: string;
  };
};

const CardSection = ({ data }: CardSectionProps) => {
  return <div>
    <h2>{data.title}</h2>
    <p>{data.description}</p>
    {data.backgroundImage && <img src={data.backgroundImage} alt={data.title} />}
  </div>;
};

export default CardSection;