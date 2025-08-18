import { StaticPageData } from "@/types/staticPages";
import { navbarData } from "./navbar";

export const personalTrainingData: StaticPageData = {
  title: "Personal Training at Drive FITT",
  description:
    "Get personalized attention and achieve your fitness goals with expert-led personal training at Drive FITT.",
  seoTitle: "Personal Training | Drive FITT",
  seoDescription:
    "Get personalized attention and achieve your fitness goals with expert-led personal training at Drive FITT.",
  navbar: navbarData,
  hero: {
    titleWords: [{ text: "Personal Training At Drive FITT", color: "#FFFFFF" }],
    description: "",
    desktopImage:
      "https://da8nru77lsio9.cloudfront.net/images/personal-training/hero.svg",
    mobileImage:
      "https://da8nru77lsio9.cloudfront.net/images/personal-training/mobile-hero.svg",
    btnPrimaryText: "Book a free trial",
    btnSecondaryText: "Join Online",
  },
  banner2WithImageSection: {
    title: "Transform Your Body. Sharpen Your Performance. Become Unshakable.",
    description:
      "Your goals deserve more than generic workouts. Our one-on-one coaching is rooted in science, personalized to your needs, and driven by data. We're not just trainers—we're performance architects.",
    image: "/images/personal-training/banner2.svg",
    backgroundImage: "/images/personal-training/banner2-bg.svg",
  },
  scrollingCardSection: {
    title: "What We Offer",
    description: "",
    iconImage: "https://da8nru77lsio9.cloudfront.net/images/check-icon.svg",
    cardSection: [
      {
        subTitle: "Tailored Programming",
        list: [
          "Every plan starts with a full assessment—physical, movement, and lifestyle.",
        ],
        extraTagLabel: "",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/cricket-compressed/scroll-card-1.webp",
      },
      {
        subTitle: "Data-Driven Progress",
        list: [
          "Delivers endless variations in speed, swing, and spin",
          "Intelligent simulation like Random, Match Practice or Match Situation",
        ],
        extraTagLabel: "",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/cricket-compressed/scroll-card-3.svg",
      },
      {
        subTitle: "Expert-Led Sessions",
        list: [
          "Prevent overuse and biomechanical injuries before they happen",
          "Real-time motion capture reveals movement flaws, helping refine technique",
          "Evidence-Based Recovery for a smarter, safer Return-to-Play",
        ],
        extraTagLabel: "",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/cricket-compressed/scroll-card-2.webp",
      },
      {
        subTitle: "Lifestyle Integration",
        list: [
          "Track your progress with our smart tech—from 3D body scans to real-time motion capture.",
        ],
        extraTagLabel: "",
        backgroundImage:
          "https://da8nru77lsio9.cloudfront.net/images/cricket-compressed/scroll-card-4.svg",
      },
    ],
  },
  meetYourCoachesSection: {
    title: "Meet Your Coaches",
    seeMoreText: "See more",
    coaches: [
      {
        id: "aisha",
        name: "Aisha",
        description: "Strength & Tone Specialist",
        image: "/images/personal-training/coach1.jpg",
      },
      {
        id: "riya-awasthi",
        name: "Riya Awasthi",
        description: "Strength & Tone Specialist",
        image: "/images/member-section/member-2.svg",
      },
      {
        id: "sikha-kapoor",
        name: "Sikha Kapoor",
        description: "Strength & Tone Specialist",
        image: "/images/member-section/member-3.svg",
      },
      {
        id: "aisha-2",
        name: "Aisha",
        description: "Strength & Tone Specialist",
        image: "/images/member-section/member-1.svg",
      },
      {
        id: "riya-awasthi-2",
        name: "Riya Awasthi",
        description: "Strength & Tone Specialist",
        image: "/images/member-section/member-2.svg",
      },
      {
        id: "sikha-kapoor-2",
        name: "Sikha Kapoor",
        description: "Strength & Tone Specialist",
        image: "/images/member-section/member-3.svg",
      },
    ],
  },
  chooseYourPathSection: {
    title: "Choose Your Path",
    buttonText: "Book Your Class Today",
    packages: [
      {
        name: "Starter",
        sessions: "12 × 60 min",
        includes: "Assessment, demo, personalized plan, habit check-ins",
      },
      {
        name: "Pro Athlete",
        sessions: "24 × 60 min",
        includes: "Monthly metrics, nutrition audit, recovery session",
      },
      {
        name: "Elite Performance",
        sessions: "42 × 60 min",
        includes: "Weekly check-ins, advanced metrics, recovery zone access",
      },
    ],
  },
  nextStepSection: {
    title: "Ready to Get Started?",
    description:
      "Ready to lead the sports and fitness revolution in your city?",
    cardList: [
      {
        icon: "https://da8nru77lsio9.cloudfront.net/images/franchise/step-1.svg",
        title: "Book your free consult – meet your coach.",
        description: "",
      },
      {
        icon: "https://da8nru77lsio9.cloudfront.net/images/franchise/discovery-icon.svg",
        title: "Get your custom plan – designed around your performance goals.",
        description: "",
      },
      {
        icon: "https://da8nru77lsio9.cloudfront.net/images/franchise/franchise-icon.png",
        title:
          "Start your transformation – train smarter, feel stronger, stay consistent.",
        description: "",
      },
    ],
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
