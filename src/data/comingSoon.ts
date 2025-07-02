import { StaticPageData } from "@/types/staticPages";

export const comingSoonData: StaticPageData = {
  title: "Coming Soon - DriveFitt Premium Club",
  description:
    "Get early access to India's first cricket and fitness club before we launch.",
  seoTitle: "Coming Soon | DriveFitt Premium Club",
  seoDescription:
    "Be the first to experience DriveFitt - India's premier cricket and fitness club. Book your free trial and get exclusive early access.",
  comingSoonSection: {
    title: "Coming Soon – Early access now open",
    description:
      "Get privileged access to our game-changing facility before launch - plus enjoy a free session to experience the difference.",
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
          { title: "About us", link: "/coming-soon" },
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
          { title: "Contact Us", link: "/contact-us" },
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
      { image: "/images/x-social.svg", link: "https://x.com/Drive_Fitt" },
      {
        image: "/images/instagram-social.svg",
        link: "https://www.instagram.com/drive_fitt/",
      },
      {
        image: "/images/linkedin-social.svg",
        link: "https://www.linkedin.com/company/drivefitt/",
      },
      {
        image: "/images/facebook-social.svg",
        link: "https://www.facebook.com/profile.php?id=61561476262978",
      },
    ],
    copyright: "©2025 Drivefitt. All rights reserved.",
  },
};
