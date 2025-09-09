import { Metadata } from "next";
import { headers } from "next/headers";
import { isMobileDevice } from "@/utils/deviceDetection";
import StaticPages from "@/components/StaticPages";
import { JobDetailResponse } from "@/types/staticPages";

// Dummy API response - in real implementation, this would be fetched from an API
const getJobDetails = async (id: string): Promise<JobDetailResponse> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: id,
    title: "Key Accounts Manager",
    location: "Dwarka sector 10, New delhi",
    jobType: "Fulltime",
    jobCategory: "Sales",
    details: [
      {
        title: "About Drivefitt",
        description:
          "Drive FITT is redefining India's fitness landscape by blending the nation's passion for cricket with world-class training, recovery, and performance facilities.",
        list: [],
      },
      {
        title: "Job Description",
        description:
          "You will be part of the expansion team at Drivefitt. Drivefitt has been the fastest growing fitness chain in the country, and has launched 10+ centers since inception. We are seeking an experienced Account Manager to join our team in Delhi, responsible for managing our franchise partners and driving business growth.",
        list: [],
      },
      {
        title: "Role",
        description: "",
        list: [
          "Franchise Partner Management: Develop and maintain strong relationships with franchise partners, ensuring timely communication, issue resolution, and conflict management.",
          "Business Growth: Collaborate with franchise partners to drive revenue growth, increase membership sales, and enhance customer retention.",
          "Performance Monitoring: Track and analyze key performance indicators (KPIs) such as membership sales, revenue growth, customer satisfaction, and partner engagement.",
          "Partner Support: Provide ongoing support and guidance to franchise partners, ensuring they have the necessary tools, training, and resources to succeed.",
          "Account Management: Manage franchise agreements, ensuring compliance with contractual terms, renewal negotiations, and dispute resolution.",
          "Market Intelligence: Gather market insights, competitor analysis, and customer feedback to inform business decisions and drive growth.",
          "Reporting and Analytics: Prepare and present regular reports to senior management, highlighting partner performance, market trends, and business opportunities.",
        ],
      },
      {
        title: "Skills and Qualifications:",
        description: "",
        list: [
          "Bachelor's/Masters degree in Business Administration, Marketing, or a related field.",
          "3+ years of experience in account management, sales, or business development, preferably in the fitness or hospitality industry.",
          "Excellent communication, interpersonal, and problem-solving skills. Ability to work independently, prioritize tasks, and manage multiple stakeholders.",
          "Proficient in data analysis, reporting, and presentation software (e.g., Excel, PowerPoint, Google Docs).",
          "Fluency in English and local languages (Hindi).",
        ],
      },
      {
        title: "Location",
        description: "New Delhi",
        list: [],
      },
      {
        title: "Years Of Exp",
        description: "3 to 5 Years",
        list: [],
      },
    ],
  };
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const jobDetails = await getJobDetails(params.id);

  return {
    title: `${jobDetails.title} | Drive FITT Premium Club`,
    description: `Apply for ${jobDetails.title} position at Drive FITT - ${jobDetails.location}`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = userAgent ? isMobileDevice(userAgent) : false;

  const jobDetails = await getJobDetails(params.id);

  const pageData = {
    title: `${jobDetails.title} | Drive FITT Premium Club`,
    description: `Apply for ${jobDetails.title} position at Drive FITT`,
    seoTitle: `${jobDetails.title} | Drive FITT Premium Club`,
    seoDescription: `Apply for ${jobDetails.title} position at Drive FITT - ${jobDetails.location}`,
    aboutUsHeroSection: {
      title: jobDetails.title,
      subTitle: "",
      description: jobDetails.location,
      roiTag: "",
      roiIcon: "",
      desktopImage:
        "https://da8nru77lsio9.cloudfront.net/images/aboutUs-c/hero.svg",
      mobileImage:
        "https://da8nru77lsio9.cloudfront.net/images/aboutUs-c/hero-mobile.svg",
      btnPrimaryText: "Apply now",
    },
    jobDetailSection: {
      job: jobDetails,
    },
    footerSection: {
      logo: "https://da8nru77lsio9.cloudfront.net/images/logo.svg",
      description:
        "Experience Gurugram's Premier Fitness & Sports Club - Gym, Cricket, Recovery & more.",
      sections: [
        {
          title: "Quick Links",
          links: [
            { title: "About us", link: "/about-us" },
            { title: "Blogs", link: "/coming-soon" },
            { title: "Career", link: "/careers" },
            { title: "Partner With Us", link: "/franchise" },
          ],
        },
        {
          title: "Services",
          links: [
            { title: "Cricket", link: "/cricket" },
            { title: "Fitness", link: "/fitness" },
            { title: "Recovery", link: "/recovery" },
            { title: "Running", link: "/running" },
            { title: "Group Classes", link: "/group-classes" },
            { title: "Pilates", link: "/pilates" },
            { title: "Personal Training", link: "/personal-training" },
          ],
        },
        {
          title: "Support",
          links: [
            { title: "Account", link: "/coming-soon" },
            { title: "Help", link: "/coming-soon" },
            { title: "Contact Us", link: "/contact-us" },
          ],
        },
        {
          title: "Legals",
          links: [
            { title: "Terms & Conditions", link: "/terms" },
            { title: "Privacy & Policy", link: "/privacy" },
          ],
        },
      ],
      socialLinks: [
        {
          image: "https://da8nru77lsio9.cloudfront.net/images/x-social.svg",
          link: "https://x.com/Drive_Fitt",
        },
        {
          image:
            "https://da8nru77lsio9.cloudfront.net/images/instagram-social.svg",
          link: "https://www.instagram.com/drive_fitt/",
        },
        {
          image:
            "https://da8nru77lsio9.cloudfront.net/images/linkedin-social.svg",
          link: "https://www.linkedin.com/company/drivefitt/",
        },
        {
          image:
            "https://da8nru77lsio9.cloudfront.net/images/facebook-social.svg",
          link: "https://www.facebook.com/profile.php?id=61561476262978",
        },
      ],
      copyright:
        "© 2025 Drive FITT by 24-7 Cricket Group India Private Limited. All rights reserved.",
    },
  };

  return (
    <main>
      <StaticPages data={pageData} pageName="about-us" isMobile={isMobile} />
    </main>
  );
}
