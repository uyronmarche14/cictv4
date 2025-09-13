export interface StoryTabFeature {
  icon: string;
  title: string;
  description: string;
}

export interface StoryTab1Data {
  badge: string;
  title: string;
  description: string;
  features: StoryTabFeature[];
  ctaText: string;
  image: { src: string; alt: string };
}

export interface StoryTab2Data {
  badge: string;
  title: string;
  description: string;
  features: StoryTabFeature[];
  ctaText: string;
  image: { src: string; alt: string };
}

export interface StoryTab3Card {
  icon: string;
  title: string;
  short: string;
  long: string;
  img: string;
}

export interface StoryTab3Data {
  items: StoryTab3Card[];
}

export interface StoryTabsData {
  tab1: StoryTab1Data;
  tab2: StoryTab2Data;
  tab3: StoryTab3Data;
  // Optional future tab
  // tab4?: StoryTab4Data;
}

export const storyTabsData: StoryTabsData = {
  tab1: {
    badge: "About Us",
    title: "Building Community in CICT",
    description:
      "The CICT Student Orgs Hub connects academic and special-interest organizations, giving students the chance to grow through collaboration, innovation, and leadership.",
    features: [
      { icon: "Users", title: "Inclusive", description: "Open to all ICT students across programs" },
      { icon: "GraduationCap", title: "Academic Growth", description: "Workshops, forums, and study groups" },
      { icon: "Lightbulb", title: "Innovation", description: "Student-led projects and competitions" },
      { icon: "Handshake", title: "Collaboration", description: "Partnering across orgs and industries" },
    ],
    ctaText: "Learn More",
    image: {
      src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660317/462565204_1269444047476302_4529409729196861854_n_axdm9t.jpg",
      alt: "CICT student organizations working together",
    },
  },
  tab2: {
    badge: "What We Do",
    title: "Activities and Opportunities",
    description:
      "CICT organizations host events, challenges, and programs that shape student experiences beyond the classroom.",
    features: [
      { icon: "Laptop", title: "Hackathons", description: "Coding challenges and software showcases" },
      { icon: "Settings", title: "Workshops", description: "Skill-based learning sessions" },
      { icon: "Trophy", title: "Competitions", description: "Robotics, pitch nights, and contests" },
      { icon: "Calendar", title: "Community Events", description: "Assemblies, networking, and socials" },
    ],
    ctaText: "See Events",
    image: {
      src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660320/cict4_qqksfh.jpg",
      alt: "Students participating in ICT events",
    },
  },
  tab3: {
    items: [
      {
        icon: "Award",
        title: "Academic Excellence",
        short: "ICT-SF leads forums and assemblies.",
        long: "From academic forums to leadership events, ICT-SF ensures students’ voices and interests are represented.",
        img: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757690971/542177205_1309267360985434_8903293361582029719_n_k55bjq.jpg",
      },
      {
        icon: "Code",
        title: "Innovation",
        short: "CSS organizes coding challenges.",
        long: "The Computer Science Society develops programming talent through peer sessions and hackathons.",
        img: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660318/459388087_1210395166778357_1242381946816835441_n_vrx5th.jpg",
      },
      {
        icon: "Cpu",
        title: "Technology & Business",
        short: "ISS bridges IT and business.",
        long: "The Information Systems Society empowers students to analyze, design, and integrate business-driven IT systems.",
        img: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660317/487955943_1222831526152162_6681935838140290852_n_c9nh5i.jpg",
      },
      {
        icon: "Bot",
        title: "Robotics",
        short: "TCU Robotics builds and competes.",
        long: "With hands-on projects and competitions, the robotics team pushes students to explore engineering and innovation.",
        img: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660317/457698062_547506844365458_715273664977199713_n_urtqe1.jpg",
      },
     
    ],
  },
};
