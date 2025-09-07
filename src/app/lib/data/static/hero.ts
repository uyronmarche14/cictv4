export interface HeroData {
  greeting: string;
  mainTitle: string;
  location: string;
  callToAction: string;
  scrollTarget?: string;
}

export const heroData: HeroData = {
  greeting: "PAGBATI!",
  mainTitle: "TECHSKHOLAR",
  location: "TAGUIG",
  callToAction: "Tara na!",
  scrollTarget: "#about",
};
