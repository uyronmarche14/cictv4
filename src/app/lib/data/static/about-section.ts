export interface AboutSectionImage {
  src: string;
  alt: string;
}

export interface AboutSectionBreakout {
  src: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

export interface AboutSectionOrgLogo {
  src: string;
  alt: string;
}

export interface AboutSectionData {
  title: string;
  description: string;
  mainImage: AboutSectionImage;
  secondaryImage: AboutSectionImage;
  breakout: AboutSectionBreakout;
  orgsTitle: string;
  orgLogos: AboutSectionOrgLogo[];
  achievementsTitle: string;
  achievementsDescription: string;
}

const defaultOrgLogos: AboutSectionOrgLogo[] = [
  {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693130/CICT_Logo_m5ztoa.png",
    alt: "ICT-SF Logo",
  },
  {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693143/CSS_Logo_PNG_x0jjcp.png",
    alt: "CSS Logo",
  },
  {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693146/ISS_Logo_bgwwn0.png",
    alt: "ISS Logo",
  },
  {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693129/ROBOTCU_Logo_hvrjkk.png",
    alt: "TCU Robotics Logo",
  },
  {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693131/BEST_CS_Logo_svstr3.png",
    alt: "BEST Logo",
  },
];

export const aboutSectionData: AboutSectionData = {
  title: "About Us",
  description:
    "The CICT Student Orgs Hub is a central platform showcasing academic and non-academic organizations under the College of Information and Communication Technology. We aim to empower ICT students through innovation, collaboration, and leadership opportunities.",
  mainImage: {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660321/DSC01362_zxuc9u.jpg",
    alt: "CICT Students working together",
  },
  secondaryImage: {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660317/462565204_1269444047476302_4529409729196861854_n_axdm9t.jpg",
    alt: "CICT Community",
  },
  breakout: {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693130/CICT_Logo_m5ztoa.png",
    alt: "CICT Logo",
    title: "Empowering ICT Students Through Innovation and Community",
    description:
      "Discover organizations that drive technology, creativity, and leadership at CICT. Join academic and special interest groups that match your passion.",
    buttonText: "Explore Organizations",
    buttonUrl: "/organizations",
  },
  orgsTitle: "Our Organizations",
  orgLogos: defaultOrgLogos,
  achievementsTitle: "Our Story",
  achievementsDescription:
    "The CICT Student Orgs Hub was created to unite ICT student organizations and highlight their contributions to the academic and cultural life of the college. Through collaboration, we foster growth, innovation, and excellence.",
};
