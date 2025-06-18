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

export interface Card {
  title: string;
  description: string;
  backgroundImage: string;
  link: string;
}

export interface StaticPageData {
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  hero: Hero;
  carouselBanner?: CarouselBanner[];
  cardSection: Card[];
}
