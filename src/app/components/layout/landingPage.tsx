"use client";

import React from "react";
import { lazy } from "react";
import Navbar from "@/app/components/layout/navbar";
import { CleanGridBackground } from "../ripplebg";

const HeroSection = lazy(
  () => import("@/app/components/sections/landingpage/heroSection")
);

const CICTSection = lazy(
  () => import("@/app/components/sections/landingpage/CICT-Section")
);

const NewsSection = lazy(
  () => import("@/app/components/sections/landingpage/newsSection")
);

const FAQsSection = lazy(
  () => import("@/app/components/sections/landingpage/faqsSection")
);

const OfferSection = lazy(
  () => import("@/app/components/sections/landingpage/offerSection")
);

const StorySection = lazy(
  () => import("@/app/components/sections/landingpage/storySection")
);

const TestimonialSeciton = lazy(
  () => import("@/app/components/sections/landingpage/Testimonial")
);

const CTASection = lazy(
  () => import("@/app/components/sections/landingpage/CTASection")
);

const FooterSection = lazy(() => import("@/app/components/layout/footer"));
interface OptimizedLayoutProps {
  children?: React.ReactNode;
}



const OptimizedLayout = ({ children }: OptimizedLayoutProps) => {
  return (
    <div className="min-h-screen bg-background dark:bg-background">
     <CleanGridBackground 
        rows={100}
        cols={100}
        cellSize={20}
        opacity={0.03}
        borderOpacity={0.8}
      />
      <Navbar />
      <main className="relative">
        <HeroSection />
        <CICTSection />
        <StorySection />
        <OfferSection />
        <NewsSection />
        <FAQsSection />
        
        <TestimonialSeciton />
        <CTASection />
        <FooterSection />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default OptimizedLayout;
