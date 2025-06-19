import { Metadata } from "next";
import { homeData } from "@/data/home";
import { StaticPageData } from "@/types/staticPages";
import StaticPage from "@/components/StaticPages";

const pageData: StaticPageData = homeData;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageData.seoTitle || pageData.title,
    description: pageData.seoDescription,
  };
}

export default function Home() {
  return (
    <main>
      <StaticPage data={pageData} pageName="home" />
    </main>
  );
}
