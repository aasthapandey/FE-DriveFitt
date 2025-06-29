import { SportsClubSectionProps } from "@/types/staticPages";
import TitleDescription from "@/components/common/TitleDescription";

const SportsClub = ({ data }: { data: SportsClubSectionProps }) => {
  const { title, description } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      <div
        className="border-[2px] border-[#262626] rounded-[20px] md:rounded-[40px] w-full h-[313px] md:h-[422px]"
        style={{
          background: "linear-gradient(180deg, #1D1D1D 0%, #0D0D0D 133.18%)",
        }}
      ></div>
    </section>
  );
};

export default SportsClub;
