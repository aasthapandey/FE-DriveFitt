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
}

export interface CardSection {
  title?: string;
  description?: string;
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

export interface StaticPageData {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  hero: Hero;
  carouselBanner?: CarouselBanner[];
  cardSection2?: StaticCardProps;
  cardSection3?: CardSection;
  cardSection4?: CardSection;
  cardSection5?: CardSection;
  innovationCommunitySection?: InnovationCommunitySectionProps;
  gallerySection?: GallerySectionProps;
  sportsClubSection?: SportsClubSectionProps;
  memberSection?: MemberSectionProps;
  appDownloadSection?: AppDownloadProps;
  footerInfoSection?: FooterInfoProps;
}
