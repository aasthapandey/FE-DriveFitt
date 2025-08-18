import { StaticPageData } from "@/types/staticPages";
import { navbarData } from "./navbar";

export const pilatesData: StaticPageData = {
  title: "Pilates at Drive FITT",
  description:
    "Build strength, improve flexibility, and enhance posture with expert-led Pilates sessions at Drive FITT.",
  seoTitle: "Premium Pilates Classes | Drive FITT",
  seoDescription:
    "Join expert-led Pilates classes at Drive FITT. Improve core strength, flexibility, and posture with a premium wellness experience.",
  navbar: navbarData,
  hero: {
    titleWords: [{ text: "Precision. Strength. Control.", color: "#FFFFFF" }],
    description: "Train hard. Recover smarter. Perform your best.",
    desktopImage:
      "/images/pilates/hero.jpg",
    mobileImage:
      "/images/pilates/mobile-hero.svg",
    btnPrimaryText: "Join the Waitlist",
    btnSecondaryText: "Join Online",
  },
  banner2Section: {
    title: "Welcome to Pilates at Drive FITT",
    description:
      "Step into a space where the session is engineered to realign, restore, and redefine the way your body moves - it's your foundation for lifelong strength, balance, and resilience.",
    class: "-mt-[282px]"
  },
  multiRevenueSection: {
    title: "Why Pilates, Why Here?",
    description:
      "Unlike standalone gyms, monetize every square foot with Drive FITT's diverse revenue stream",
    cardList: [
      {
        icon: "https://da8nru77lsio9.cloudfront.net/images/franchise/multi-revenue-icon-3.svg",
        title: "Expert-Led Sessions",
        description: "Emphasizing alignment, mobility, and functional strength",
      },
      {
        icon: "https://da8nru77lsio9.cloudfront.net/images/franchise/multi-revenue-icon-4.svg",
        title: "Mat & Equipment-based Formats",
        description: "Professional cricket coaching with advanced analytics",
      },
      {
        icon: "https://da8nru77lsio9.cloudfront.net/images/franchise/multi-revenue-icon-5.svg",
        title: "Small Groups",
        description:
          "Personal formats for focused attention",
      },
      {
        icon: "https://da8nru77lsio9.cloudfront.net/images/franchise/multi-revenue-icon-6.svg",
        title: "Supportive Environment",
        description: "Breath-centered space that restores as it strengthens",
      },
    ],
  },
  evolutionSection: {
    title: "Pilates Formats Offered",
    evolutionList: [
      {
        title: "Mat Pilates",
        description:
          "The foundation. Grounded, focused, and precise. Strengthen from within using nothing but your body, gravity, and control.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/recovery-compressed/evolution-1.webp",
      },
      {
        title: "Reformer Pilates",
        description:
          "Experience Pilates on the reformer for dynamic resistance, precision-based movement, and deeply targeted strength.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/recovery-compressed/evolution-2.webp",
      },
      {
        title: "Athletic Pilates",
        description:
          "Designed for performance-minded individuals - think enhanced mobility, core strength, and body awareness that elevates you in sport and life.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/recovery-compressed/evolution-3.webp",
      },
    ],
  },
  photoCircleSection: {
    title: "Who It’s For",
    description:
      "From CXOs decompressing after a high-stakes day to young athletes building foundational mobility, Pilates fits into every lifestyle. It's the ideal complement to high-intensity training, sport performance, and recovery.",
    image1: "/images/pilates/photoCircle1.svg",
    image2: "/images/pilates/photoCircle2.svg",
  },
  bannerCTASection: {
    title: "Find Your Center. Build Your Edge.",
    description:
      "Book your class today and discover the transformative power of Pilates - only at Drive FITT.",
    btnLabel: "Book Your Class Today",
    desktopImage: "/images/pilates/bannerCTASectionDesktop.svg",
    mobileImage: "/images/pilates/bannerCTASectionMobile.svg",
  },
  bannerSection: {
    title: "Become a DriveFITT member",
    description:
      "Join the waitlist now and be the first to access elite workouts, expert coaching, exclusive perks, member-only events, and special launch offers.",
    btnLabel: "Join the Waitlist",
    image: "https://da8nru77lsio9.cloudfront.net/images/becomeMember.svg",
    mobileImage: "https://da8nru77lsio9.cloudfront.net/images/becomeMember.svg",
  },
  gallerySection: {
    title: "Step Inside the Future of Sports & Fitness",
    description:
      "Tour our state-of-the-art club and discover how Drive FITT redefines space, energy, and purpose.",
    btnLabel: "View Gallery",
    imageList: [13, 14, 15],
  },
  footerInfoSection: {
    footerInfoList: [
      {
        title: "Write To Us",
        description: "Our friendly team is here to help",
        email: "info@drivefitt.club",
        image: "https://da8nru77lsio9.cloudfront.net/images/ChatToUs.svg",
      },
      {
        title: "Visit Us",
        description: "Discover the best of what we offer at our Flagship Club",
        email: "M3M 65th Avenue, Sector 65, Gurugram, Haryana 122022",
        image: "https://da8nru77lsio9.cloudfront.net/images/VisitUs.svg",
      },
      {
        title: "Call Us",
        description: "Mon - Sun from 10AM To 10PM",
        email: "+91-9871836565",
        image: "https://da8nru77lsio9.cloudfront.net/images/CallUs.svg",
      },
    ],
    socialLinkList: [
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
    contactFormSection: {
      title: "Get In Touch",
      description: "We'd love to hear from you. Please fill out this form.",
      submitButtonText: "Send Message",
      fields: {
        firstName: {
          label: "First Name*",
          placeholder: "Enter your first name",
        },
        lastName: {
          label: "Last Name",
          placeholder: "Enter your last name",
        },
        email: {
          label: "Email ID",
          placeholder: "Enter your email address",
        },
        phone: {
          label: "Phone Number*",
          placeholder: "Enter phone number",
        },
        message: {
          label: "Message",
          placeholder: "Write your message here...",
        },
      },
    },
  },
  footerSection: {
    logo: "https://da8nru77lsio9.cloudfront.net/images/logo.svg",
    description:
      "Experience Gurugram's Premier Sports Club - Cricket, Fitness, Recovery & more.",
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
