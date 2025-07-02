import { ContactUsPageData } from "@/types/staticPages";

export const contactUsData: ContactUsPageData = {
  title: "",
  description: "",
  seoTitle: "",
  seoDescription: "",
  hero: {
    title: "Contact us",
    description:
      "Please Feel Free to contact us and we will get back to you as soon as we can.",
    desktopImage: "/images/hero/contactUs.svg",
    mobileImage: "/images/hero/contact-us-mobile.svg",
  },
  footerInfoSection: {
    footerInfoList: [
      {
        title: "Chat to us",
        description: "Our friendly team is here to help",
        email: "info@drivefitt.club",
        image: "/images/ChatToUs.svg",
      },
      {
        title: "Visit us",
        description: "Welcome to Our Main Club Branch.",
        email: "Sector-56, Golf Course RdGurugram, Haryana 122022",
        image: "/images/VisitUs.svg",
      },
      {
        title: "Call us",
        description: "Mon - Sun from 10am to 10pm",
        email: "+91-9999999990",
        image: "/images/CallUs.svg",
      },
    ],
    socialLinkList: [
      {
        image: "/images/x-social.svg",
        link: "https://x.com/Drive_Fitt",
      },
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
    contactFormSection: {
      title: "Get in touch",
      description: "We'd love to hear from you. Please fill out this form.",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      submitButtonText: "Send Message",
    },
  },
  appDownloadSection: {
    title: "Your exclusive access, now on mobile",
    description:
      "Our app makes it easy to join classes, connect with coaches and track your journey.",
    googlePlayImg: "/images/app-download/google-play.svg",
    appStoreImg: "/images/app-download/app-store.svg",
    dfLogo: "/images/app-download/df-logo.svg",
    mobileImage: "/images/app-download/mobile.png",
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
