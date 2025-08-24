import { StaticPageData } from "@/types/staticPages";
import { navbarData } from "./navbar";

export const groupClassesData: StaticPageData = {
  title: "Group Classes at Drive FITT",
  description:
    "Get personalized attention and achieve your fitness goals with expert-led group classes at Drive FITT.",
  seoTitle: "Group Classes | Drive FITT",
  seoDescription:
    "Get personalized attention and achieve your fitness goals with expert-led group classes at Drive FITT.",
  navbar: navbarData,
  hero: {
    titleWords: [{ text: "Group Training, Reimagined.", color: "#FFFFFF" }],
    description: "",
    desktopImage: "/images/group-classes/hero.jpg",
    mobileImage: "/images/group-classes/hero-mobile3.png",
    btnPrimaryText: "Book a free trial",
    btnSecondaryText: "Join Online",
  },
  banner2Section: {
    title:
      " At Drive FITT, group classes are science-backed, coach-led, and community-powered — blending intensity, flow, rhythm, and recovery to move, challenge, and elevate you.",
    description: "",
    titleClass:
      "px-6 py-10 md:px-[48px] md:py-[60px] text-xl font-normal leading-[30px] tracking-[0px] md:text-[40px] md:font-normal md:leading-[56px] md:tracking-[-2px] text-center",
    class: "md:px-[168px] md:-mt-[200px]",
    subClass: "px-0 py-0 md:px-0 md:py-0",
  },
  signatureClassesSection: {
    title: "Explore Our Signature Classes",
    cardList: [
      {
        title: "Power Yoga",
        description:
          "Strength-driven flow that blends breath and movement to sculpt, focus, and build resilience.",
        backgroundImage: "/images/group-classes/power-yoga.jpg",
      },
      {
        title: "Circuit Training",
        description:
          "Fast-paced, high-intensity stations that torch calories, boost endurance, and build strength.",
        backgroundImage: "/images/group-classes/circuit-training.jpg",
      },
      {
        title: "HIIT",
        description:
          "Intense intervals for serious burn, performance gains, and next-level conditioning.",
        backgroundImage: "/images/group-classes/HIIT.jpg",
      },
      {
        title: "Boxing",
        description:
          "Real fight-style drills, pad work, and conditioning — not just cardio-boxing.",
        backgroundImage: "/images/group-classes/boxing.jpg",
      },
      {
        title: "Core Blast",
        description:
          "30 minutes to strengthen your core, protect your back, and improve control.",
        backgroundImage: "/images/group-classes/core-blast.jpg",
      },
      {
        title: "Spinning",
        description:
          "Performance-tracked cycling fused with music for an unmatched cardio high.",
        backgroundImage: "/images/group-classes/spining.jpg",
      },
      {
        title: "TRX",
        description:
          "Suspension training to build strength, mobility, and core power at any level.",
        backgroundImage: "/images/group-classes/TRX.jpg",
      },
    ],
    cardList2: [
      {
        title: "Dance Fitness",
        description:
          "Music-fueled, high-energy moves that feel like a party, not a workout.",
        backgroundImage: "/images/group-classes/dance-fitness.jpg",
      },
      {
        title: "Pilates",
        description:
          "Core-toning, posture-improving, and flexibility-boosting precision training.",
        backgroundImage: "/images/group-classes/pilates.jpg",
      },
      {
        title: "Vinyasa Yoga",
        description:
          "Breath-led, flowing practice that restores balance and deepens mind-body connection.",
        backgroundImage: "/images/group-classes/vinyasa-yoga.jpg",
      },
      {
        title: "Flexi Strength",
        description:
          "Flexibility meets functional strength for mobility, injury prevention, and longevity.",
        backgroundImage: "/images/group-classes/flexi-strength.jpg",
      },
      {
        title: "ABT (Abs, Butt, Thighs)",
        description:
          "Targeted toning for glutes, core, and thighs with high-rep, sculpting moves.",
        backgroundImage: "/images/group-classes/Abt.jpg",
      },
      {
        title: "Zumba",
        description:
          "Latin-inspired cardio dance for endurance, coordination, and pure joy.",
        backgroundImage: "/images/group-classes/zumba.jpg",
      },
      {
        title: "Yoga",
        description:
          "Modern yet timeless sequences to strengthen, restore, and ground your body and mind.",
        backgroundImage: "/images/group-classes/yoga1.jpg",
      },
    ],
  },
  bannerCTASection2: {
    title: "More Than a Class. It’s a Culture.",
    description:
      "Every session at Drive FITT is intentionally designed, professionally led, and performance-driven. Whether you're leveling up your strength, chasing recovery, or finding your flow - our group classes meet you at your edge and take you beyond.",
    btnLabel: "Book a free trial",
    desktopImage: "/images/group-classes/bannerCta2.png",
    mobileImage: "/images/group-classes/bannerCta2Mobile.png",
    imageClass: "md:max-h-[564px]",
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
          { title: "About us", link: "/about-us" },
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
