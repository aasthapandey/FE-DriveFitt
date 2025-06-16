import { readFileSync } from "fs";
import { join } from "path";
import { Metadata } from "next";
import HeroSection from "@component/components/StaticPages/HeroSection";
import CardSection from "@component/components/StaticPages/CardSection";
import { getPageData } from "@component/common/utils";

export async function generateMetadata({ params }): Promise<Metadata> {
  const slug = params.slug;
  const data = getPageData(slug);
  return {
    title: data.seoTitle || data.title,
    description: data.seoDescription,
  };
}



export default function Page({ params }) {
  const slug = params.slug;
  const data = getPageData(slug);

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
