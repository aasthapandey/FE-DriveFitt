import { StaticPageData } from "@/types/staticPages";

export const error404Data: StaticPageData = {
  title: "404 - Page Not Found | DriveFitt Premium Club",
  description: "The page you're looking for doesn't exist. Return to DriveFitt's homepage.",
  seoTitle: "404 - Page Not Found | DriveFitt Premium Club",
  seoDescription: "Oops! The page you're looking for doesn't exist. Return to DriveFitt's homepage to explore our premium cricket and fitness facilities.",
  error404Section: {
    title: "Oops! Page Not Found",
    description: "We can't find the page you're looking for",
    iconImage: "/images/404.svg",
    btnText: "Go to home",
    btnLink: "/",
  },
  footerSection: {
    logo: "/images/logo.svg",
    description:
      "Experience Gurugram's premier fitness & sports club – Gym, cricket, recovery & more",
    sections: [
      {
        title: "Quick links",
        links: [
          { title: "About us", link: "/coming-soon" },
          { title: "Our services", link: "/coming-soon" },
          { title: "Blogs", link: "/coming-soon" },
          { title: "Career", link: "/coming-soon" },
          { title: "Partner with us", link: "/franchise" },
        ],
      },
      {
        title: "Services",
        links: [
          { title: "Cricket", link: "/cricket" },
          { title: "Fitness", link: "/fitness" },
          { title: "Recovery", link: "/recovery" },
          { title: "Running", link: "/running" },
          { title: "Group Classes", link: "/coming-soon" },
          { title: "Pilates", link: "/coming-soon" },
          { title: "Personal Training", link: "/coming-soon" },
        ],
      },
      {
        title: "Support",
        links: [
          { title: "Account", link: "/coming-soon" },
          { title: "Help", link: "/coming-soon" },
          { title: "Contact Us", link: "/coming-soon" },
          { title: "Customer Support", link: "/coming-soon" },
        ],
      },
      {
        title: "Legals",
        links: [
          { title: "Terms & Conditions", link: "/terms" },
          { title: "Privacy & Policy", link: "/privacy" },
          { title: "Licenses", link: "/licenses" },
        ],
      },
    ],
    socialLinks: [
      { image: "/images/x-social.svg", link: "" },
      { image: "/images/instagram-social.svg", link: "" },
      { image: "/images/linkedin-social.svg", link: "" },
      { image: "/images/facebook-social.svg", link: "" },
    ],
    copyright: "©2025 Drivefitt. All rights reserved.",
  },
}; 