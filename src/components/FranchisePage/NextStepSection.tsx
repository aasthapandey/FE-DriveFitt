import { CardSection } from "@/types/franchisePage";
import Image from "next/image";

interface NextStepSectionProps {
  data: CardSection;
  isMobile?: boolean;
}

const NextStepSection = ({ data, isMobile }: NextStepSectionProps) => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col items-center text-center gap-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
            {data.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.cardList.map((card, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-2xl p-6 flex flex-col items-center gap-4 hover:bg-[#2A2A2A] transition duration-300"
            >
              <div className="relative w-12 h-12 mb-2">
                <Image
                  src={card.icon}
                  alt={card.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <p className="text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextStepSection;
