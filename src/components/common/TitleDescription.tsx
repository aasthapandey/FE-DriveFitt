const TitleDescription = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-[9px] md:gap-4">
      <h2
        className={`${
          !description ? "mb-2 md:mb-[48px]" : ""
        } text-2xl md:text-5xl font-semibold leading-7 md:leading-[56px] tracking-[-1px] md:tracking-[-2px] text-center`}
      >
        {title}
      </h2>
      {description && (
        <p className="text-xs md:text-base font-light leading-4 md:leading-5 tracking-[-1%] text-[#8A8A8A] text-center mb-2 md:mb-[48px]">
          {description}
        </p>
      )}
    </div>
  );
};

export default TitleDescription;
