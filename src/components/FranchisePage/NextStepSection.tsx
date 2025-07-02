import { CardSection } from "@/types/franchisePage";
import TitleDescription from "@/components/common/TitleDescription";
import Image from "next/image";

interface NextStepSectionProps {
  data: CardSection;
  isMobile?: boolean;
}

const NextStepSection = ({ data }: NextStepSectionProps) => {
  const { title, description, cardList } = data;
  return (
    <section className="md:px-[120px] px-6 flex flex-col gap-5">
      <TitleDescription title={title || ""} description={description || ""} />
      <div className="flex gap-[29px] h-full">
        <div className="relative flex flex-col justify-around items-center">
          <div className="absolute left-1/2 top-[50px] md:top-[100px] bottom-[50px] md:bottom-[100px] w-[2px] border-l-[2px] border-dashed border-[#333333]" />
          {cardList.map((card, index) => {
            return (
              <div
                key={card.title}
                className="relative bg-[#333333] size-[50px] md:size-[100px] rounded-full flex justify-center items-center text-xl md:text-5xl leading-[56px] font-light"
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col justify-between gap-2 md:gap-6 w-full">
          {cardList.map((card, index) => {
            return (
              <div
                key={index}
                className="rounded-[20px] items-center md:rounded-[40px] border border-[#333333] p-2 md:p-10 flex gap-4 md:gap-10"
                style={{
                  background:
                    "linear-gradient(180deg, #111111 0.77%, #141414 100%)",
                }}
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={76}
                  height={76}
                  className="size-[45px] md:size-[76px]"
                />
                <div className="flex flex-col gap-2 md:gap-4 tracking-[-1px]">
                  <h3 className="font-semibold text-2xl md:text-[32px] leading-10">
                    {card.title}
                  </h3>
                  <p className="text-[#8A8A8A] font-normal text-xs md:text-base leading-5 ">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NextStepSection;
