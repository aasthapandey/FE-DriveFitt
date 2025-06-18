import { StaticPageData } from "@/types/staticPages";

export const homeData: StaticPageData = {
  title: "Welcome to DriveFitt Premium Club",
  description: "Experience Gurugram's premier sports club and fitness center.",
  seoTitle: "DriveFitt Premium Club | Home",
  seoDescription:
    "Join DriveFitt, Gurugram's top sports club for cricket, fitness, recovery, and more. Premium facilities and expert coaching.",
  hero: {
    title: "Where Champions Come to STRIVE",
    description:
      "Experience Gurugram's premier sports club & fitness center – Cricket, Fitness, Recovery, Community…and more",
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
  cardSection: [
    {
      title: "Cricket",
      description:
        "Fuel up with wholesome meals, recovery shakes, and smart hydration—designed for every fitness goal.",
      backgroundImage: "/images/card-section/home/cricket.svg",
      link: "/cricket",
    },
    {
      title: "Fitness",
      description:
        "Expertly designed strength, conditioning, and performance training utilizing top-tier equipment, tailored for you.",
      backgroundImage: "/images/card-section/home/fitness.svg",
      link: "/fitness",
    },
    {
      title: "Recovery",
      description:
        "Cold Plunge, infrared sauna, compression & percussion therapy along with physiotherapy to recharge, recover, and reduce injury risk.",
      backgroundImage: "/images/card-section/home/recovery.svg",
      link: "/recovery",
    },
    {
      title: "Running",
      description:
        "Pace-enhancing run classes with functional drills to optimize speed, agility & endurance.",
      backgroundImage: "/images/card-section/home/running.svg",
      link: "/running",
    },
  ],
};
