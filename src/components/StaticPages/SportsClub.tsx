import { SportsClubSectionProps } from "@/types/staticPages";

const SportsClub = ({ data }: { data: SportsClubSectionProps }) => {
  const { title, description } = data;
  return (
    <section className="px-[120px] flex flex-col gap-5">
      <h2 className="text-5xl font-semibold leading-[56px] tracking-[-2px] text-center">
        {title}
      </h2>
      {description && (
        <p className="text-base font-light leading-5 tracking-[-1%] text-[#8A8A8A] text-center mb-[52px]">
          {description}
        </p>
      )}
      <div
        className="border-[2px] border-[#262626] rounded-[40px] w-full h-[422px]"
        style={{
          background: "linear-gradient(180deg, #1D1D1D 0%, #0D0D0D 133.18%)",
        }}
      ></div>
    </section>
  );
};

export default SportsClub;
