export interface NavigationLink {
  title: string;
  href: string;
}

export interface NavigationData {
  links: NavigationLink[];
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const navigationData: NavigationData = {
  links: [
    { title: "Home", href: "#" },
    { title: "About", href: "#" },
    { title: "Programs", href: "#" },
    { title: "Events", href: "#" },
    { title: "Contact", href: "#" },
  ],
  logo: {
    src: "/app/lib/CICT.png",
    alt: "CICT Logo",
    width: 28,
    height: 28,
  },
};
