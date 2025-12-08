'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { lazy, Suspense, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
import { organizations } from '@/components/organizations/organizationData';
import { isLightColor, createOrgGradient } from '@/components/organizations/utils';

const OrganizationShowcase = lazy(() => import('@/components/organizations/OrganizationShowcase'));

/* ─────────────  Props Interface  ───────────── */
interface AboutWithTabsProps {
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

/* ─────────────  Default Companies  ───────────── */
const defaultCompanies = [
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693130/CICT_Logo_m5ztoa.png',
    alt: 'CICT',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693143/CSS_Logo_PNG_x0jjcp.png',
    alt: 'CSS',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693146/ISS_Logo_bgwwn0.png',
    alt: 'ISS',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693129/ROBOTCU_Logo_hvrjkk.png',
    alt: 'ROBOTCU',
  },
  {
    src: 'https://res.cloudinary.com/ddnxfpziq/image/upload/v1757693131/BEST_CS_Logo_svstr3.png',
    alt: 'BEST CS',
  },
];

/* ─────────────  Animation Variants  ───────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

/* ─────────────  Main Component  ───────────── */
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
    description: 'Empowering students with world-class education and industry connections.',
    buttonText: 'Learn More',
    buttonUrl: '#',
  },
  companiesTitle = 'Our Student Organizations',
  companies = defaultCompanies,
  achievementsTitle = 'Student Organizations',
  achievementsDescription = 'Discover the vibrant student organizations that make CICT a thriving community of innovation and collaboration.',
}: AboutWithTabsProps) {
  const [activeOrg, setActiveOrg] = useState('ict-sf');
  
  const currentOrg = organizations.find(org => org.id === activeOrg);
  const primaryColor = currentOrg?.color.primary || '#6e29f6';
  const secondaryColor = currentOrg?.color.secondary || '#f629a8';

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Subtle Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000"
      
      />

      <div className="container max-w-7xl mx-auto   relative">
        {/* Section Header */}
        <motion.div 
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              Our Story
            </span>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent mb-6"
          >
            {title}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Image Grid - Clean Bento Layout */}
        <motion.div 
          className="grid gap-4 md:gap-6 lg:grid-cols-3 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Main Image */}
          <motion.div 
            variants={fadeInUp}
            className="relative lg:col-span-2 h-[350px] lg:h-[450px] rounded-2xl overflow-hidden group"
          >
            <CldImage
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          
          {/* Side Column */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-4 md:gap-6">
            {/* Info Card */}
            <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-card to-muted/30 p-6 border border-border/50 shadow-sm h-[200px] lg:h-[220px]">
              <CldImage 
                src={breakout.src} 
                alt={breakout.alt} 
                width={180} 
                height={60} 
                className="h-12 w-auto object-contain" 
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-2">{breakout.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{breakout.description}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href={breakout.buttonUrl}>{breakout.buttonText}</a>
              </Button>
            </div>
            
            {/* Secondary Image */}
            <div className="relative flex-1 min-h-[180px] rounded-2xl overflow-hidden group">
              <CldImage
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Organization Logos */}
        <motion.div 
          className="py-12 border-y border-border/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            {companiesTitle}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {companies.map((company, idx) => (
              <div
                key={company.src + idx}
                className="flex items-center justify-center p-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
              >
                <CldImage
                  src={company.src}
                  alt={company.alt}
                  width={100}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                  className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Organizations Tabs Section */}
        <motion.div 
          className="pt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-3">
              {achievementsTitle}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {achievementsDescription}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Tabs defaultValue="ict-sf" onValueChange={setActiveOrg} className="w-full">
              {/* Tab Triggers */}
              <TabsList className="mx-auto flex flex-wrap justify-center gap-2 bg-transparent border-0 mb-8 max-w-4xl">
                {organizations.map((org) => (
                  <TabsTrigger
                    key={org.id}
                    value={org.id}
                    className="px-4 py-2 text-xs sm:text-sm font-medium rounded-full border border-border/40 bg-background hover:bg-muted/50 transition-all duration-300 data-[state=active]:border-0 data-[state=active]:shadow-lg"
                    style={{
                      ...(activeOrg === org.id && {
                        backgroundColor: org.color.primary,
                        color: isLightColor(org.color.primary) ? '#000' : '#fff',
                      })
                    }}
                  >
                    {org.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Contents */}
              <Suspense 
                fallback={
                  <div 
                    className="h-[400px] w-full rounded-2xl animate-pulse" 
                    style={{ backgroundColor: `${primaryColor}08` }} 
                  />
                }
              >
                {organizations.map((org) => (
                  <TabsContent key={org.id} value={org.id} className="mt-0 focus-visible:outline-none">
                    <div 
                      className="rounded-2xl border border-border/20 overflow-hidden transition-all duration-500"
                      style={{
                        background: createOrgGradient(org.color.primary, org.color.secondary)
                      }}
                    >
                      <OrganizationShowcase organizationId={org.id} />
                    </div>
                  </TabsContent>
                ))}
              </Suspense>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
