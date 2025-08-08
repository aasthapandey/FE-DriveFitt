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
import StructuredData from "@/components/common/StructuredData";

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
      title: "Page Not Found | DriveFITT Premium Club",
      description: "The page you're looking for doesn't exist.",
    };
  }

  const pageUrl = `https://drivefitt.club/${slug}`;
  const heroImage =
    data.hero?.desktopImage ||
    "https://da8nru77lsio9.cloudfront.net/images/homec/hero.webp";

  return {
    title: data.seoTitle || data.title,
    description: data.seoDescription,
    keywords: [
      `${slug} gurugram`,
      `${slug} training`,
      `${slug} coaching`,
      "drive fitt",
      "premium sports club",
      "fitness center",
    ],
    openGraph: {
      title: data.seoTitle || data.title,
      description: data.seoDescription,
      url: pageUrl,
      type: "website",
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `${data.title} at Drive FITT Premium Club`,
        },
      ],
    },
    twitter: {
      title: data.seoTitle || data.title,
      description: data.seoDescription,
      images: [heroImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "cricket" },
    { slug: "fitness" },
    { slug: "recovery" },
    { slug: "running" },
  ];
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
    <>
      <StructuredData
        type="webpage"
        data={{
          title: data.seoTitle || data.title,
          description: data.seoDescription,
          url: `/${slug}`,
        }}
      />
      <main>
        <StaticPage data={data} pageName={pageName} isMobile={isMobile} />
      </main>
    </>
  );
}
