import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cricketData } from "@/data/cricket";
import { fitnessData } from "@/data/fitness";
import { recoveryData } from "@/data/recovery";
import { runningData } from "@/data/running";
import { StaticPageData } from "@/types/staticPages";
import StaticPage from "@/components/StaticPages";
import { headers } from "next/headers";
import { isMobileDevice } from "@/utils/deviceDetection";

type PageParams = {
  params: {
    slug: string;
  };
};

const pageData: { [key: string]: StaticPageData } = {
  cricket: cricketData,
  fitness: fitnessData,
  recovery: recoveryData,
  running: runningData,
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const slug = params.slug;
  const data = pageData[slug];
  
  if (!data) {
    return {
      title: "Page Not Found | DriveFitt Premium Club",
      description: "The page you're looking for doesn't exist.",
    };
  }
  
  return {
    title: data.seoTitle || data.title,
    description: data.seoDescription,
  };
}

export default function Page({ params }: PageParams) {
  const slug = params.slug;
  const data = pageData[slug];
  
  if (!data) {
    notFound();
  }
  
  const pageName = Array.isArray(slug) ? slug[0] : slug;
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = userAgent ? isMobileDevice(userAgent) : false;

  return (
    <main>
      <StaticPage data={data} pageName={pageName} isMobile={isMobile} />
    </main>
  );
}
