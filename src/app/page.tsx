import { Metadata } from "next";
import HeroSection from "@component/components/StaticPages/HeroSection";
import CardSection from "@component/components/StaticPages/CardSection";
import { getPageData } from "@component/common/utils";

export async function generateMetadata({ params }): Promise<Metadata> {
  const slug = params.slug;
  const data = getPageData("home");
  return {
    title: data.seoTitle || data.title,
    description: data.seoDescription,
  };
}

export default function Page() {
  const data = getPageData("home");

  return (
    <main>
      <section><HeroSection data={data.hero} /></section>
      {data.cardSection && (
        <section>
          {data.cardSection.map((card, idx) => (
            <CardSection data={card} key={idx} />
          ))}
        </section>
      )}
    </main>
  );
}