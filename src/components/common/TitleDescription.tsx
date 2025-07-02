const TitleDescription = ({
  title,
  description,
  isBanner,
}: {
  title: string;
  description?: string;
  isBanner?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-3 md:gap-4 ${isBanner ? "!gap-2" : ""}`}>
      <h2
        className={`${
          !description ? "mb-2 md:mb-[48px]" : ""
        } text-2xl md:text-5xl font-semibold leading-7 md:leading-[56px] px-0 md:px-[120px] tracking-[-1px] md:tracking-[-2px] text-center`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`${
            isBanner ? "text-white" : ""
          } text-xs md:text-base font-light leading-4 md:leading-5 tracking-[-1%] text-[#8A8A8A] text-center mb-2 md:mb-[48px]`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default TitleDescription;
