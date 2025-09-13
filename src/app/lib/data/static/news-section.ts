export interface NewsSectionData {
  image: { src: string; width: number | string; height: number | string; alt: string };
  title: string;
  description: string;
  cta: { text: string; href: string };
}

export const newsSectionData: NewsSectionData = {
  image: {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1757690971/542599484_1309267357652101_3653917054284547079_n_gz4rrd.jpg",
    width: 1800,
    height: 1800,
    alt: "CICT students in classroom",
  },
  title: "CICT NEWS AND EVENTS YOUR ONE STOP TO NEWS AND UPDATES",
  description:
    "Stay updated with the latest news, events, and announcements from the College of Information and Communication Technology.",
  cta: { text: "View All News", href: "#" },
};

