"use client";

import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { lazy, Suspense } from "react";

/* ─────────────  lazy-loaded tab contents  ───────────── */
const Story1 = lazy(() => import("@/app/components/StoryTabs/tabs1"));
const Story2 = lazy(() => import("@/app/components/StoryTabs/tabs2"));
const Story3 = lazy(() => import("@/app/components/StoryTabs/tabs3"));
import Logo from "@/app/lib/CICT.png";
/* ─────────────  original About3 (unchanged except achievements)  ──────────���── */
interface About3Props {
  title?: string;
  description?: string;
  mainImage?: { src: string; alt: string };
  secondaryImage?: { src: string; alt: string };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{ src: string; alt: string }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
}

const defaultCompanies = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

export default function AboutWithTabs({
  title = "About Us",
  description = "Shadcnblocks is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  mainImage = {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1755790148/529718384_122100992648966778_7029427848362639164_n_geskab.jpg",
    alt: "placeholder",
  },
  secondaryImage = {
    src: "https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660317/462565204_1269444047476302_4529409729196861854_n_axdm9t.jpg",
    alt: "placeholder",
  },
  breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "Hundreds of blocks at Shadcnblocks.com",
    description:
      "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://shadcnblocks.com",
  },
  companiesTitle = "Valued by clients worldwide",
  companies = defaultCompanies,
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
}: About3Props) {
  return (
    <section className="py-32">
      <div className="container">
        {/* hero grid */}
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="bg-muted flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-12"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a
                  href={breakout.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        {/* company logos */}
        <div className="py-32">
          <p className="text-center">{companiesTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ----  ACHIEVEMENTS BECOMES TABS  ---- */}
        <div className="relative overflow-hidden rounded-xl bg-transparent backdrop-blur-sm">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
              Our Story
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl">
              {achievementsDescription}
            </p>
          </div>

          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="mx-auto grid w-full max-w-md grid-cols-3 gap-2 border-0 bg-transparent">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-border/30 hover:bg-muted/30 rounded-lg border transition-all duration-200"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-border/30 hover:bg-muted/30 rounded-lg border transition-all duration-200"
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-border/30 hover:bg-muted/30 rounded-lg border transition-all duration-200"
              >
                Insights
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <Suspense
                fallback={
                  <div className="bg-muted/10 h-20 w-full animate-pulse rounded-lg" />
                }
              >
                <TabsContent value="overview" className="mt-0">
                  <Story1 />
                </TabsContent>
                <TabsContent value="features" className="mt-0">
                  <Story2 />
                </TabsContent>
                <TabsContent value="insights" className="mt-0">
                  <Story3 />
                </TabsContent>
              </Suspense>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
