export enum LoginModalType {
  PHONE = "PHONE",
  EMAIL = "EMAIL",
}

export interface NavbarProps {
  logo: string;
  navLinks: Array<{
    title: string;
    href: string;
  }>;
  signInButton: {
    text: string;
  };
  loginModalType: LoginModalType;
}

export interface Hero {
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  btnPrimaryText?: string;
  btnPrimaryLink?: string;
}

export interface CardSection {
  title: string;
  description: string;
  cards: unknown[];
}

export interface CarouselBanner {
  image: string;
  title: string;
  description: string;
}

export interface StaticCardProps {
  title: string;
  description: string;
  cards: unknown[];
}

export interface InnovationCommunitySectionProps {
  title: string;
  description: string;
}

export interface GallerySectionProps {
  title: string;
  description: string;
  images: string[];
}

export interface SportsClubSectionProps {
  title: string;
  description: string;
}

export interface MemberSectionProps {
  title: string;
  description: string;
}

export interface AppDownloadProps {
  title: string;
  description: string;
}

export interface FooterInfoProps {
  title: string;
  description: string;
}

export interface FooterSection {
  title: string;
  links: Array<{ title: string; link: string }>;
}

export interface SocialLink {
  image: string;
  link: string;
}

export interface FooterProps {
  logo: string;
  description: string;
  sections: FooterSection[];
  socialLinks: SocialLink[];
  copyright: string;
}

export interface EvolutionSectionProps {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  title: string;
  faqs: FAQ[];
}

export interface ScrollingCardSection {
  title: string;
  cards: unknown[];
}

export interface CountdownSection {
  title: string;
  endDate: string;
}

export interface ComingSoonSection {
  title: string;
  description: string;
}

export interface Error404Section {
  title: string;
  description: string;
}

export interface PolicySection {
  title: string;
  htmlContent: string;
}

export interface JoinNowSectionProps {
  title: string;
  description: string;
}

export interface RecoveryBannerProps {
  title: string;
  description: string;
}

export interface NotJustClubSectionProps {
  title: string;
  description: string;
}

export interface EcosystemGifSectionProps {
  title: string;
  description: string;
}

export interface Coach {
  name: string;
  image: string;
  role?: string;
  [key: string]: unknown;
}

export interface MeetYourCoachesSectionProps {
  title: string;
  coaches: Coach[];
  seeMoreText: string;
}

export interface Package {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface ChooseYourPathSectionProps {
  title: string;
  packages: Package[];
  buttonText: string;
}

export interface PhotoCircleSectionProps {
  title: string;
  description: string;
}

export interface Banner2SectionType {
  title: string;
  description: string;
}

export interface Banner2WithImageProps {
  title: string;
  description: string;
  image: string;
  backgroundImage: string;
  mobileBackgroundImage: string;
  className?: string;
}

export interface CardsParallaxProps {
  title: string;
  cards: unknown[];
}

export interface SignatureClassCard {
  title: string;
  description: string;
  backgroundImage: string;
}

export interface SignatureClassesSection {
  title: string;
  classes: unknown[];
  cardList: SignatureClassCard[];
  cardList2: SignatureClassCard[];
}

export interface PricingPlan {
  title: string;
  subtitle?: string;
  discountedPrice: string;
  originalPrice: string;
  discountPercentage: string;
  buttonText: string;
  seatsLeft: string;
  limitedOfferCountText?: string; // e.g., "100 members" or "100 families"
}

export interface PricingPlansSection {
  plans: PricingPlan[];
}

export interface IncludedPlansSection {
  title: string;
  items: string[];
  className?: string;
}

export interface Job {
  id: number;
  title: string;
  location?: string;
  [key: string]: unknown;
}

export interface JobSearchSection {
  title: string;
  jobs: Job[];
}

export interface JobDetail {
  id: number;
  title: string;
  location?: string;
  [key: string]: unknown;
}

export interface JobDetailSection {
  job: JobDetail;
}

export interface ApplyNowFormSection {
  jobId: string;
}

export interface StaticPageData {
  title?: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  hero?: Hero;
  franchiseHeroSection?: Hero;
  aboutUsHeroSection?: Hero;
  cardSection4?: CardSection;
  cardSection3?: CardSection;
  cardSection5?: CardSection;
  cardSection2?: StaticCardProps;
  innovationCommunitySection?: InnovationCommunitySectionProps;
  evolutionSection?: EvolutionSectionProps;
  gallerySection?: GallerySectionProps;
  faqSection?: FaqSectionProps;
  sportsClubSection?: SportsClubSectionProps;
  bannerSection?: SportsClubSectionProps;
  memberSection?: MemberSectionProps;
  appDownloadSection?: AppDownloadProps;
  footerInfoSection?: FooterInfoProps;
  footerSection?: FooterProps;
  scrollingCardSection?: ScrollingCardSection;
  comingSoonSection?: ComingSoonSection;
  error404Section?: Error404Section;
  policySection?: PolicySection;
  joinNowSection?: JoinNowSectionProps;
  recoveryBannerSection?: RecoveryBannerProps;
  notJustClubSection?: NotJustClubSectionProps;
  ecosystemGifSection?: EcosystemGifSectionProps;
  meetYourCoachesSection?: MeetYourCoachesSectionProps;
  chooseYourPathSection?: ChooseYourPathSectionProps;
  photoCircleSection?: PhotoCircleSectionProps;
  banner2Section?: Banner2SectionType;
  banner2WithImageSection?: Banner2WithImageProps;
  cardsParallaxSection?: CardsParallaxProps;
  signatureClassesSection?: SignatureClassesSection;
  pricingPlansSection?: PricingPlansSection;
  includedPlansSection?: IncludedPlansSection;
  jobSearchSection?: JobSearchSection;
  jobDetailSection?: JobDetailSection;
  applyNowForm?: ApplyNowFormSection;
}
