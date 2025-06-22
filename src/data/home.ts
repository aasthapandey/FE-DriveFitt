import { StaticPageData } from "@/types/staticPages";

export const homeData: StaticPageData = {
  title: "Welcome to DriveFitt Premium Club",
  description: "Experience Gurugram's premier sports club and fitness center.",
  seoTitle: "DriveFitt Premium Club | Home",
  seoDescription:
    "Join DriveFitt, Gurugram's top sports club for cricket, fitness, recovery, and more. Premium facilities and expert coaching.",
  hero: {
    title: "India’s First Cricket and Fitness Club",
    description: "",
    desktopImage: "/images/hero/home.svg",
    mobileImage: "/images/hero/home-mobile.svg",
    btnPrimaryText: "Join Online",
    btnSecondaryText: "",
  },
  carouselBanner: [
    {
      title: "Experience Premium Club. Launching in GURUGRAM",
      countdownEnd: "2025-09-19",
      backgroundImage: "/images/carouselBanner/banner-1.svg",
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
        backgroundImage: "/images/card-section/home/cricket.svg",
        link: "/cricket",
      },

      {
        title: "Fitness",
        //todo
        description:
          "Expertly designed strength, conditioning, and performance training utilizing top-tier equipment, tailored for you.",
        backgroundImage: "/images/card-section/home/fitness.svg",
        link: "/fitness",
      },
      {
        title: "Recovery",
        //todo
        description:
          "Cold Plunge, infrared sauna, compression & percussion therapy along with physiotherapy to recharge, recover, and reduce injury risk.",
        backgroundImage: "/images/card-section/home/recovery.svg",
        link: "/recovery",
      },
      {
        title: "Running",
        //todo
        description:
          "Pace-enhancing run classes with functional drills to optimize speed, agility & endurance.",
        backgroundImage: "/images/card-section/home/running.svg",
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
        backgroundImage: "/images/card-section/home/Group-Classes.svg",
        link: "/cricket",
        className: "!h-full",
      },
      {
        title: "Pilates",
        description: "",
        backgroundImage: "/images/card-section/home/Pilates.svg",
        link: "/cricket",
      },
      {
        title: "Personal Training",
        description: "",
        backgroundImage: "/images/card-section/home/Personal-Training.svg",
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
        backgroundImage: "/images/card-section/home/card-section-2-bg.svg",
        modalImage: "/images/card-section/home/man-modal.svg",
        link: "/cricket",
      },
      {
        title: "pro shop",
        description:
          "Access premium cricket gear, fitness accessories, and apparel—all curated for champions.",
        backgroundImage: "/images/card-section/home/card-section-2-bg.svg",
        modalImage: "/images/card-section/home/woman-modal.svg",
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
            image: "/images/info1-1.svg",
            description: "3D body scans assessment",
          },
          {
            image: "/images/info1-2.svg",
            description: "A.I. ball tracking & analytics for cricket",
          },
          {
            image: "/images/info1-3.svg",
            description: "Integrated member app",
          },
        ],
      },
      {
        title: "Premium workspaces",
        list: [
          {
            image: "/images/info2-1.svg",
            description: "Dedicated phone booths",
          },
          {
            image: "/images/info2-2.svg",
            description: "Ample sitting space",
          },
          {
            image: "/images/info2-3.svg",
            description: "Fast and reliable Wi-Fi",
          },
        ],
      },
      {
        title: "Community & Challenges",
        list: [
          {
            image: "/images/info3-1.svg",
            description: "Squad based challenges",
          },
          {
            image: "/images/info3-2.svg",
            description: "Signature events & experiences",
          },
          {
            image: "/images/info3-3.svg",
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
    btnLabel: "View Gallery",
    imageList: [
      "/images/gallery-section/gallery-home-1.svg",
      "/images/gallery-section/gallery-home-2.svg",
      "/images/gallery-section/gallery-home-3.svg",
    ],
  },
  sportsClubSection: {
    title: "The Drive FIIT sports club philosophy",
    description: "The Drive FIIT Model: Engineered for Excellence",
    image: "/images/card-section/home/Personal-Training.svg",
  },
};
