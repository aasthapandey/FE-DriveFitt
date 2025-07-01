import { FooterInfoProps, FooterProps } from "./staticPages";

export interface FranchiseHero {
  title: string;
  subTitle: string;
  description: string;
  roiTag: string;
  roiIcon: string;
  desktopImage: string;
  mobileImage: string;
  btnPrimaryText: string;
}

export interface BannerSection {
  title: string;
  subTitle: string;
  description1: string;
  description2: string;
  description3: string;
}

export interface Card {
  icon: string;
  title: string;
  description?: string | string[];
  subTitle?: string;
}

export interface CardSection {
  title: string;
  description: string;
  cardList: Card[];
}

export interface ImageCardSection extends CardSection {
  image: string;
}

export interface Banner2SectionType {
  title: string;
  description: string;
}

export interface FranchisePageData {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  hero: FranchiseHero;
  banner1Section: BannerSection;
  multiRevenueSection: CardSection;
  opportunitySection: CardSection;
  whatYouReceiveSection: ImageCardSection;
  whatLookingForSection: CardSection;
  banner2Section: Banner2SectionType;
  nextStepSection: CardSection;
  footerInfoSection: FooterInfoProps;
  footerSection: FooterProps;
}
