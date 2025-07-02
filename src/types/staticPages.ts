export interface Hero {
  title: string;
  description: string;
  desktopImage: string;
  mobileImage: string;
  btnPrimaryText: string;
  btnSecondaryText?: string;
}

export interface CarouselBanner {
  title: string;
  countdownEnd: string;
  backgroundImage: string;
}

export interface CardType {
  title?: string;
  description?: string;
  backgroundImage?: string;
  link?: string;
  className?: string;
  iconImage?: string;
}

export interface CardSection {
  title?: string;
  description?: string;
  isMobile?: boolean;
  cardSection: CardType[];
}

export interface StaticCardType extends CardType {
  modalImage: string;
}

export interface StaticCardProps {
  title?: string;
  description?: string;
  cardSection: StaticCardType[];
}

export interface InfoItem {
  image: string;
  description: string;
}

export interface InfoSection {
  title: string;
  list: InfoItem[];
}

export interface InnovationCommunitySectionProps {
  title: string;
  description: string;
  infoSection: InfoSection[];
}

export interface GallerySectionProps {
  title: string;
  description: string;
  btnLabel: string;
  imageList: string[];
}

export interface SportsClubSectionProps {
  title: string;
  description: string;
  btnLabel?: string;
  image: string;
}

export interface MemberItem {
  title: string;
  description: string;
  backgroundImage: string;
  link: string;
}

export interface MemberSectionProps {
  title: string;
  description: string;
  memberList: MemberItem[];
}

export interface AppDownloadProps {
  title: string;
  description: string;
  googlePlayImg: string;
  appStoreImg: string;
  dfLogo: string;
  mobileImage: string;
}

export interface SocialLinks {
  image: string;
  link: string;
}

export interface FooterInfoItem {
  title: string;
  description: string;
  email: string;
  image: string;
}

export interface ContactFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  submitButtonText: string;
  title: string;
  description: string;
}

export interface FooterInfoProps {
  footerInfoList: FooterInfoItem[];
  socialLinkList: SocialLinks[];
  contactFormSection: ContactFormProps;
}

export interface FooterLink {
  title: string;
  link: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo: string;
  description: string;
  sections: FooterSection[];
  socialLinks: SocialLinks[];
  copyright: string;
}

export interface EvolutionItem {
  title: string;
  description: string;
  backgroundImage: string;
}

export interface EvolutionSectionProps {
  title: string;
  evolutionList: EvolutionItem[];
}

export type FaqItem = {
  title: string;
  description: string;
  isOpen?: boolean;
};

export type FaqSectionProps = {
  title: string;
  description: string;
  faqList: FaqItem[];
};

export interface ScrollingCardItem {
  subTitle: string;
  list: string[];
  extraTagLabel?: string;
  backgroundImage: string;
}

export interface ScrollingCardSection {
  title: string;
  description: string;
  iconImage: string;
  cardSection: ScrollingCardItem[];
}

export interface CountdownSection {
  title: string;
  date: string;
  bgImage: string;
}

export interface ComingSoonSection {
  title: string;
  description: string;
  iconImage: string;
  btnPrimaryText: string;
  btnSecondaryText: string;
  btnPrimaryLink?: string;
  btnSecondaryLink?: string;
}

export interface Error404Section {
  title: string;
  description: string;
  iconImage: string;
  btnText: string;
  btnLink?: string;
}

export interface PolicySection {
  htmlContent: string;
}

export interface StaticPageData {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  hero?: Hero;
  countdownSection?: CountdownSection;
  comingSoonSection?: ComingSoonSection;
  error404Section?: Error404Section;
  policySection?: PolicySection;
  carouselBanner?: CarouselBanner[];
  cardSection2?: StaticCardProps;
  cardSection3?: CardSection;
  cardSection4?: CardSection;
  cardSection5?: CardSection;
  innovationCommunitySection?: InnovationCommunitySectionProps;
  gallerySection?: GallerySectionProps;
  sportsClubSection?: SportsClubSectionProps;
  memberSection?: MemberSectionProps;
  evolutionSection?: EvolutionSectionProps;
  appDownloadSection?: AppDownloadProps;
  footerInfoSection?: FooterInfoProps;
  footerSection?: FooterProps;
  faqSection?: FaqSectionProps;
  bannerSection?: SportsClubSectionProps;
  scrollingCardSection?: ScrollingCardSection;
}
