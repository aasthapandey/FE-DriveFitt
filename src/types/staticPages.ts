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
}
