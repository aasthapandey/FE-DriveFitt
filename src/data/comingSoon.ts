import { StaticPageData } from "@/types/staticPages";

export const comingSoonData: StaticPageData = {
  title: "Coming Soon - DriveFitt Premium Club",
  description: "Get early access to India's first cricket and fitness club before we launch.",
  seoTitle: "Coming Soon | DriveFitt Premium Club",
  seoDescription:
    "Be the first to experience DriveFitt - India's premier cricket and fitness club. Book your free trial and get exclusive early access.",
  comingSoonSection: {
    title: "Coming Soon – Early access now open",
    description: "Get privileged access to our game-changing facility before launch - plus enjoy a free session to experience the difference.",
    iconImage: "/images/comingsoon.svg",
    btnPrimaryText: "Book a Free Trial",
    btnSecondaryText: "Go to Home",
    btnPrimaryLink: "#trial-booking",
    btnSecondaryLink: "/",
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