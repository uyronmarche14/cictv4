"use client";

import React from "react";
import { lazy } from "react";
import Navbar from "@/app/components/layout/navbar";
import PixelBlast from "../ripplebg";
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
      <Navbar />
      <main className="relative">
        {/* Hero Section with PixelBlast Background */}
        <div className="relative">
          {/* PixelBlast Background - Positioned behind Hero */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <PixelBlast
              variant="circle"
              pixelSize={6}
              color="#B19EEF"
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.6}
              edgeFade={0.25}
              transparent
            />
          </div>
          {/* Hero Content */}
          <div className="relative z-10">
            <HeroSection />
          </div>
        </div>

        {/* Other Sections */}
        <CICTSection />
        <StorySection />
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
