"use client";
import { lazy, Suspense } from "react";
import Image from "next/image"
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { aboutSectionData } from "@/app/lib/data";
import type { AboutSectionData } from "@/app/lib/data/static/about-section";

/* ─────────────  lazy-loaded tab contents  ───────────── */
const Story1 = lazy(() => import("@/app/components/StoryTabs/tabs1"));
const Story2 = lazy(() => import("@/app/components/StoryTabs/tabs2"));
const Story3 = lazy(() => import("@/app/components/StoryTabs/tabs3"));

/* ─────────────  original About3 (unchanged except achievements)  ──────────���── */
interface AboutWithTabsProps {
  data?: Partial<AboutSectionData>;
}


export default function AboutWithTabs({ data = {} }: AboutWithTabsProps) {
  // Merge external data with defaults
  const mergedData = { ...aboutSectionData, ...data };
  const {
    title = aboutSectionData.title,
    description = aboutSectionData.description,
    mainImage = aboutSectionData.mainImage,
    secondaryImage = aboutSectionData.secondaryImage,
    breakout = aboutSectionData.breakout,
    orgsTitle = aboutSectionData.orgsTitle,
    orgLogos = aboutSectionData.orgLogos,
    achievementsTitle = aboutSectionData.achievementsTitle,
    achievementsDescription = aboutSectionData.achievementsDescription,
  } = mergedData;
  return (
    <section className="py-32">
      <div className="container">
        {/* hero grid */}
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            width={1200}
            height={800}
            className="size-full max-h-[720px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="bg-muted flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto">
              <Image
                src={breakout.src}
                alt={breakout.alt}
                width={48}
                height={48}
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
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              width={800}
              height={600}
              className="grow rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        {/* company logos */}
        <div className="py-32">
          <p className="text-center">{orgsTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {orgLogos && Array.isArray(orgLogos) && orgLogos.map((orgLogo: { src: string; alt: string }, idx: number) => (
              <div className="flex items-center gap-3" key={orgLogo.src + idx}>
                <Image
                  src={orgLogo.src}
                  alt={orgLogo.alt}
                  width={240}
                  height={240}
                  className="h-8 w-auto md:h-24"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ----  ACHIEVEMENTS BECOMES TABS  ---- */}
        <div className="relative overflow-hidden rounded-xl bg-transparent backdrop-blur-sm">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
              {achievementsTitle}
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
