import { StaticPageData } from "@/types/staticPages";

export const error404Data: StaticPageData = {
  title: "404 - Page Not Found | DriveFitt Premium Club",
  description: "The page you're looking for doesn't exist. Return to DriveFitt's homepage.",
  seoTitle: "404 - Page Not Found | DriveFitt Premium Club",
  seoDescription: "Oops! The page you're looking for doesn't exist. Return to DriveFitt's homepage to explore our premium cricket and fitness facilities.",
  error404Section: {
    title: "Oops! Page Not Found",
    description: "We can't find the page you're looking for",
    iconImage: "https://da8nru77lsio9.cloudfront.net/images/1751427188771_ec99e463bf9859fa_Group_1597880512.webp",
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
          { title: "About us", link: "/about" },
          { title: "Our services", link: "/services" },
          { title: "Blogs", link: "/blogs" },
          { title: "Career", link: "/career" },
          { title: "Partner with us", link: "/partner" },
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
          { title: "Account", link: "/account" },
          { title: "Help", link: "/help" },
          { title: "Contact Us", link: "/contact" },
          { title: "Customer Support", link: "/support" },
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