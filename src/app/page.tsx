import { Metadata } from "next";
import { homeData } from "@/data/home";
import { StaticPageData } from "@/types/staticPages";
import StaticPages from "@/components/StaticPages";
import { headers } from "next/headers";
import { isMobileDevice } from "@/utils/deviceDetection";
import StructuredData from "@/components/common/StructuredData";

const pageData: StaticPageData = homeData;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: pageData.seoTitle || pageData.title,
    description: pageData.seoDescription,
    keywords: [
      "fitness club gurugram",
      "cricket coaching",
      "premium sports club",
      "recovery center",
      "personal training",
      "group fitness classes",
    ],
    openGraph: {
      title: pageData.seoTitle || pageData.title,
      description: pageData.seoDescription,
      url: "https://drivefitt.club",
      type: "website",
      images: [
        {
          url: "https://da8nru77lsio9.cloudfront.net/images/homec/hero.webp",
          width: 1200,
          height: 630,
          alt: "Drive FITT Premium Sports Club Hero Image",
        },
      ],
    },
    twitter: {
      title: pageData.seoTitle || pageData.title,
      description: pageData.seoDescription,
      images: ["https://da8nru77lsio9.cloudfront.net/images/homec/hero.webp"],
    },
    alternates: {
      canonical: "https://drivefitt.club",
    },
  };
}

export default function Home() {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = userAgent ? isMobileDevice(userAgent) : false;

  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="local-business" />
      <StructuredData
        type="webpage"
        data={{
          title: pageData.seoTitle,
          description: pageData.seoDescription,
          url: "",
        }}
      />
      <main>
        <StaticPages data={homeData} pageName="home" isMobile={isMobile} />
      </main>
    </>
  );
}
