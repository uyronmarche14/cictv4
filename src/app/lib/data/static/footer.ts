export interface SocialLink {
  name: string;
  href: string;
  icon: string; // Icon name as string
  label: string;
}

export interface FooterData {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  navigationLinks: Array<{
    title: string;
    href: string;
  }>;
  socialLinks: SocialLink[];
  copyright: {
    company: string;
    text: string;
  };
}

export const footerData: FooterData = {
  logo: {
    src: "/app/lib/CICT.png",
    alt: "CICT Logo",
    width: 218,
    height: 218,
  },
  navigationLinks: [
    { title: "Features", href: "#" },
    { title: "Solution", href: "#" },
    { title: "Customers", href: "#" },
    { title: "Pricing", href: "#" },
    { title: "Help", href: "#" },
    { title: "About", href: "#" },
  ],
  socialLinks: [
    {
      name: "Twitter",
      href: "#",
      icon: "Twitter",
      label: "Follow us on Twitter",
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: "Linkedin",
      label: "Connect on LinkedIn",
    },
    {
      name: "Facebook",
      href: "#",
      icon: "Facebook",
      label: "Like us on Facebook",
    },
    {
      name: "Instagram",
      href: "#",
      icon: "Instagram",
      label: "Follow us on Instagram",
    },
  ],
  copyright: {
    company: "Tailark",
    text: "All rights reserved.",
  },
};
