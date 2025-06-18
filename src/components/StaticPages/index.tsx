import Navbar from "@/components/Navbar";
import HeroSection from "@/components/StaticPages/HeroSection";
import CardSection from "@/components/StaticPages/CardSection";

const StaticPage = ({ data }: { data: any }) => {
  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat w-full"
        style={{ backgroundImage: `url(${data.hero.desktopImage})` }}
      >
        <Navbar />
        <HeroSection data={data.hero} />
      </div>
      {data.cardSection && (
        <section className="px-20 py-16">
          {data.cardSection.map((card, idx) => (
            <CardSection data={card} key={idx} />
          ))}
        </section>
      )}
    </div>
  );
};

export default StaticPage;
