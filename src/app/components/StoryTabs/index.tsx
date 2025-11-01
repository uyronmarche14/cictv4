'use client';

import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { lazy, Suspense } from 'react';
import { CldImage } from 'next-cloudinary';

/* ─────────────  lazy-loaded tab contents  ───────────── */
const OrganizationShowcase = lazy(() => import('@/app/components/StoryTabs/OrganizationShowcase'));


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
  achievementsDescription?: string;
}

const defaultCompanies = [
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693130/CICT_Logo_m5ztoa.png',
    alt: 'Arc',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693143/CSS_Logo_PNG_x0jjcp.png',
    alt: 'Descript',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693146/ISS_Logo_bgwwn0.png',
    alt: 'Mercury',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693129/ROBOTCU_Logo_hvrjkk.png',
    alt: 'Ramp',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693131/BEST_CS_Logo_svstr3.png',
    alt: 'Retool',
  },

];

export default function AboutWithTabs({
  title = 'About CICT',
  description = 'The College of Information and Communication Technology is dedicated to nurturing future tech leaders through innovative programs, cutting-edge research, and strong industry partnerships.',
  mainImage = {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1755790148/529718384_122100992648966778_7029427848362639164_n_geskab.jpg',
    alt: 'CICT Campus',
  },
  secondaryImage = {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660317/462565204_1269444047476302_4529409729196861854_n_axdm9t.jpg',
    alt: 'CICT Students',
  },
  breakout = {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693130/CICT_Logo_m5ztoa.png',
    alt: 'CICT Logo',
    title: 'Excellence in Technology Education',
    description:
      'Empowering students with world-class education, state-of-the-art facilities, and industry connections to thrive in the digital age.',
    buttonText: 'Learn More',
    buttonUrl: '#',
  },
  companiesTitle = 'Our Student Organizations',
  companies = defaultCompanies,
  achievementsDescription =
  'Discover the vibrant student organizations that make CICT a thriving community of innovation and collaboration.',
}: About3Props) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Hero Grid */}
        <div className="mb-16 grid gap-6 text-center md:grid-cols-2 md:text-left md:gap-12">
          <h1 className="text-balance text-4xl font-bold lg:text-6xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Image Grid - Clean Layout */}
        <div className="grid gap-6 lg:grid-cols-3 mb-20">
          {/* Main Image */}
          <div className="relative lg:col-span-2 h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-border/20">
            <CldImage
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
          
          {/* Side Column */}
          <div className="flex flex-col gap-6">
            {/* Info Card */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-br from-muted to-muted/50 p-8 shadow-lg border border-border/20 h-[250px]">
              <CldImage src={breakout.src} alt={breakout.alt} width={200} height={80} className="h-20 w-auto object-contain" />
              <div className="flex-1">
                <p className="mb-2 text-xl font-bold text-foreground">{breakout.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{breakout.description}</p>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <a href={breakout.buttonUrl}>
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            
            {/* Secondary Image */}
            <div className="relative h-[230px] lg:flex-1 rounded-2xl overflow-hidden shadow-2xl border border-border/20">
              <CldImage
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>

        {/* Organization Logos - Cleaned Up */}
        <div className="py-16 border-t border-b border-border/50">
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            {companiesTitle}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company, idx) => (
              <div
                key={company.src + idx}
                className="flex items-center justify-center p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200"
              >
                <CldImage
                  src={company.src}
                  alt={company.alt}
                  width={128}
                  height={64}
                  style={{ width: "auto", height: "auto" }}
                  className="h-12 w-auto md:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ----  ACHIEVEMENTS BECOMES TABS  ---- */}
        <div className="relative overflow-hidden bg-transparent backdrop-blur-sm">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-balance text-3xl font-bold lg:text-4xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="max-w-xl text-muted-foreground mx-auto">
              {achievementsDescription}
            </p>
          </div>

          <Tabs defaultValue="ict-sf" className="mt-8">
            <TabsList className="mx-auto max-w-4xl grid w-full grid-cols-5 gap-2 bg-transparent border-0">
              <TabsTrigger
                value="ict-sf"
                className="data-[state=active]:bg-[#6e29f6] data-[state=active]:text-white border border-border/30 hover:bg-muted/30 transition-all duration-200 rounded-lg text-xs sm:text-md"
              >
                ICT-SF
              </TabsTrigger>
              <TabsTrigger
                value="css"
                className="data-[state=active]:bg-white data-[state=active]:text-black border border-border/30 hover:bg-muted/30 transition-all duration-200 rounded-lg text-xs sm:text-md"
              >
                CSS
              </TabsTrigger>
              <TabsTrigger
                value="iss"
                className="data-[state=active]:bg-black data-[state=active]:text-white border border-border/30 hover:bg-muted/30 transition-all duration-200 rounded-lg text-xs sm:text-md"
              >
                ISS
              </TabsTrigger>
              <TabsTrigger
                value="robotcu"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white border border-border/30 hover:bg-muted/30 transition-all duration-200 rounded-lg text-xs sm:text-md"
              >
                ROBOTCU
              </TabsTrigger>
              <TabsTrigger
                value="best"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white border border-border/30 hover:bg-muted/30 transition-all duration-200 rounded-lg text-xs sm:text-md"
              >
                BEST
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <Suspense fallback={<div className="h-20 w-full animate-pulse bg-muted/10 rounded-lg" />}>
                <TabsContent value="ict-sf" className="mt-0">
                  <OrganizationShowcase organizationId="ict-sf" />
                </TabsContent>
                <TabsContent value="css" className="mt-0">
                  <OrganizationShowcase organizationId="css" />
                </TabsContent>
                <TabsContent value="iss" className="mt-0">
                  <OrganizationShowcase organizationId="iss" />
                </TabsContent>
                <TabsContent value="robotcu" className="mt-0">
                  <OrganizationShowcase organizationId="robotcu" />
                </TabsContent>
                <TabsContent value="best" className="mt-0">
                  <OrganizationShowcase organizationId="best" />
                </TabsContent>
              </Suspense>
            </div>
          </Tabs>


        </div>
      </div>
    </section>
  );
}