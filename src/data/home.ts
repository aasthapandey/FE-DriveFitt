import { StaticPageData } from "@/types/staticPages";
import { navbarData } from "./navbar";

export const homeData: StaticPageData = {
  title: "DriveFitt",
  description: "Experience the best fitness and sports facilities.",
  seoTitle: "DriveFitt - Premium Fitness & Sports Club",
  seoDescription:
    "Join DriveFitt, Gurugram's premier fitness & sports club. Experience state-of-the-art facilities for cricket, fitness, recovery, and more.",
  navbar: navbarData,
  hero: {
    titleWords: [
      {
        text: "India's First ",
        color: "#FFFFFF",
      },
      {
        text: "Cricket ",
        color: "#00DBDC",
      },
      {
        text: "and ",
        color: "#FFFFFF",
      },
      {
        text: "Fitness ",
        color: "#00DBDC",
      },
      {
        text: "Club",
        color: "#FFFFFF",
      },
    ],
    description: "",
    desktopImage: "https://da8nru77lsio9.cloudfront.net/images/hero/home.webp",
    originalDesktopImage:
      "https://da8nru77lsio9.cloudfront.net/images/hero/home-original.svg",
    mobileImage:
      "https://da8nru77lsio9.cloudfront.net/images/hero/home-mobile.webp",
    originalMobileImage:
      "https://da8nru77lsio9.cloudfront.net/images/hero/home-mobile-original.svg",
    btnPrimaryText: "Join Now",
    btnSecondaryText: "Join Now",
  },
  countdownSection: {
    title: "Experience Premium Club. Launching in ",
    date: "2025-07-15",
    bgImage: "https://da8nru77lsio9.cloudfront.net/images/counter-bg.svg",
    location: "GURUGRAM",
    openingText: "Opening in",
    labels: {
      days: "DAYS",
      hours: "HOURS",
      minutes: "MINUTE",
      seconds: "SECOND",
    },
  },
  carouselBanner: [
    {
      title: "Experience Premium Club. Launching in GURUGRAM",
      countdownEnd: "2025-09-19",
      backgroundImage:
        "https://da8nru77lsio9.cloudfront.net/images/carouselBanner/banner-1.svg",
    },
  ],
  cardSection4: {
    title: "A complete ecosystem for peak performance",
    description:
      "From cricket training to full-spectrum fitness and recovery—every element of your game is here.",
    cardSection: [
      {
        title: "Cricket",
        description:
          "Fuel up with wholesome meals, recovery shakes, and smart hydration - designed for every fitness goal.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/mobile-card4-1.webp",
        link: "/cricket",
      },
      {
        title: "Fitness",
        description:
          "Expertly designed strength, conditioning, and performance training utilizing top-tier equipment, tailored for you.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/card4-2.webp",
        link: "/fitness",
      },
      {
        title: "Recovery",
        description:
          "Cold Plunge, infrared sauna, compression & percussion therapy along with physiotherapy to recharge, recover, and reduce injury risk.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/card4-3.webp",
        link: "/recovery",
      },
      {
        title: "Running",
        description:
          "Pace-enhancing run classes with functional drills to optimize speed, agility & endurance.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/card4-4.webp",
        link: "/running",
      },
    ],
  },
  cardSection3: {
    title: "Train your way",
    description:
      "Group energy. Focused strength. Smart recovery — your training, your terms.",
    cardSection: [
      {
        title: "Group Classes",
        description: "",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/card3-1.webp",
        link: "/cricket",
      },
      {
        title: "Pilates",
        description: "",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/card3-2.webp",
        link: "/cricket",
      },
      {
        title: "Personal Training",
        description: "",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/card3-3.webp",
        link: "/cricket",
      },
    ],
  },
  cardSection2: {
    title: "Refueling & Gear-Up Zone",
    description: "Refuel. Recharge. Reinvent.",
    cardSection: [
      {
        title: "protein bar",
        description:
          "Fuel up with wholesome meals, recovery shakes, and smart hydration—designed for every fitness goal.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/card-section/home/card-section-2-bg.svg",
        modalImage:
          "https://da8nru77lsio9.cloudfront.net/images/card-section/home/man-modal.svg",
        link: "/cricket",
      },
      {
        title: "pro shop",
        description:
          "Access premium cricket gear, fitness accessories, and apparel—all curated for champions.",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/card-section/home/card-section-2-bg.svg",
        modalImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/card2-2.svg",
        link: "/cricket",
      },
    ],
  },
  innovationCommunitySection: {
    title: "Innovation & Community",
    description: "Beyond Training: Your Tech-Integrated Fitness Lifestyle",
    infoSection: [
      {
        title: "Performance tech",
        list: [
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info1-1.svg",
            description: "3D body scans assessment",
          },
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info1-2.svg",
            description: "A.I. ball tracking & analytics for cricket",
          },
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info1-3.svg",
            description: "Integrated member app",
          },
        ],
      },
      {
        title: "Premium workspaces",
        list: [
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info2-1.svg",
            description: "Dedicated phone booths",
          },
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info2-2.svg",
            description: "Ample sitting space",
          },
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info2-3.svg",
            description: "Fast and reliable Wi-Fi",
          },
        ],
      },
      {
        title: "Community & Challenges",
        list: [
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info3-1.svg",
            description: "Squad based challenges",
          },
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info3-2.svg",
            description: "Signature events & experiences",
          },
          {
            image: "https://da8nru77lsio9.cloudfront.net/images/info3-3.svg",
            description: "Family Plan",
          },
        ],
      },
    ],
  },
  gallerySection: {
    title: "Step inside the future of sports & fitness",
    description:
      "Tour our state-of-the-art club and discover how Drive FIIT redefines space, energy, and purpose.",
    btnLabel: "Join online",
    imageList: [
      "https://da8nru77lsio9.cloudfront.net/images/homec/gallery-1.webp",
      "https://da8nru77lsio9.cloudfront.net/images/homec/gallery-2.webp",
      "https://da8nru77lsio9.cloudfront.net/images/homec/gallery-3.webp",
    ],
  },
  sportsClubSection: {
    title: "The Drive FIIT sports club philosophy",
    description: "The Drive FIIT Model: Engineered for Excellence",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/ecosystem.svg",
  },
  memberSection: {
    title: "What our members are saying",
    description:
      "Join a like-minded community of athletes and fitness enthusiasts who call DriveFITT their second home.",
    memberList: [
      {
        title: "Riya Bajaj",
        description: "Yoga Class",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/member-1.webp",
        link: "/cricket",
      },
      {
        title: "Kunal Jain",
        description: "Membership plan",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/member-2.webp",
        link: "/cricket",
      },
      {
        title: "Rahul Kapoor",
        description: "Membership plan",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/homec/member-3.webp",
        link: "/cricket",
      },
    ],
  },
  appDownloadSection: {
    title: "Your exclusive access, now on mobile",
    description:
      "Our app makes it easy to join classes, connect with coaches and track your journey.",
    googlePlayImg: "/images/google-app-store.svg",
    appStoreImg: "/images/apple-app-store.svg",
    desktopImage:
      "https://da8nru77lsio9.cloudfront.net/images/app-download/desktop-bg.svg",
    mobileImage:
      "https://da8nru77lsio9.cloudfront.net/images/app-download/mobile-bg.svg",
  },
  footerInfoSection: {
    footerInfoList: [
      {
        title: "Chat to us",
        description: "Our friendly team is here to help",
        email: "info@drivefitt.club",
        image: "https://da8nru77lsio9.cloudfront.net/images/ChatToUs.svg",
      },
      {
        title: "Visit us",
        description: "Welcome to Our Main Club Branch.",
        email: "Sector-56, Golf Course RdGurugram, Haryana 122022",
        image: "https://da8nru77lsio9.cloudfront.net/images/VisitUs.svg",
      },
      {
        title: "Call us",
        description: "Mon - Sun from 10am to 10pm",
        email: "+91-9999999990",
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
      title: "Get in touch",
      description: "We'd love to hear from you. Please fill out this form.",
      submitButtonText: "Send Message",
      fields: {
        firstName: {
          label: "First Name",
          placeholder: "",
        },
        lastName: {
          label: "Last Name",
          placeholder: "",
        },
        email: {
          label: "Email ID",
          placeholder: "",
        },
        phone: {
          label: "Phone Number",
          placeholder: "",
        },
        message: {
          label: "Message",
          placeholder: "",
        },
      },
    },
  },
  footerSection: {
    logo: "https://da8nru77lsio9.cloudfront.net/images/logo.svg",
    description:
      "Experience Gurugram's premier fitness & sports club – Gym, cricket, recovery & more",
    sections: [
      {
        title: "Quick links",
        links: [
          {
            title: "About us",
            link: "/coming-soon",
          },
          {
            title: "Blogs",
            link: "/coming-soon",
          },
          {
            title: "Career",
            link: "/coming-soon",
          },
          {
            title: "Partner with us",
            link: "/franchise",
          },
        ],
      },
      {
        title: "Services",
        links: [
          {
            title: "Cricket",
            link: "/cricket",
          },
          {
            title: "Fitness",
            link: "/fitness",
          },
          {
            title: "Recovery",
            link: "/recovery",
          },
          {
            title: "Running",
            link: "/running",
          },
          {
            title: "Group Classes",
            link: "/coming-soon",
          },
          {
            title: "Pilates",
            link: "/coming-soon",
          },
          {
            title: "Personal Training",
            link: "/coming-soon",
          },
        ],
      },
      {
        title: "Support",
        links: [
          {
            title: "Account",
            link: "/coming-soon",
          },
          {
            title: "Help",
            link: "/coming-soon",
          },
          {
            title: "Contact Us",
            link: "/contact-us",
          },
        ],
      },
      {
        title: "Legals",
        links: [
          {
            title: "Terms & Conditions",
            link: "/terms",
          },
          {
            title: "Privacy & Policy",
            link: "/privacy",
          },
          {
            title: "Licenses",
            link: "/licenses",
          },
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
    copyright: "©2025 Drivefitt. All rights reserved.",
  },
};
