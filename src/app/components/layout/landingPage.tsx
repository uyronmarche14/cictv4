"use client";

import React from "react";
import Navbar from "@/app/components/layout/navbar";
import { CleanGridBackground } from "../ripplebg";
import {
  createLazyComponent,
  IntersectionLazy,
} from "@/app/lib/utils/lazy-loading";
import {
  HeroSectionFallback,
  FeaturesSectionFallback,
  NewsSectionFallback,
  FAQSectionFallback,
  TestimonialSectionFallback,
  CTASectionFallback,
  StorySectionFallback,
} from "@/app/components/ui/section-fallbacks";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

// Create lazy components with specific fallbacks
const HeroSection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/heroSection"),
  { fallback: HeroSectionFallback }
);

const CICTSection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/CICT-Section"),
  { fallback: FeaturesSectionFallback }
);

const NewsSection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/newsSection"),
  { fallback: NewsSectionFallback }
);

const FAQsSection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/faqsSection"),
  { fallback: FAQSectionFallback }
);

const OfferSection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/offerSection"),
  { fallback: FeaturesSectionFallback }
);

const StorySection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/storySection"),
  { fallback: StorySectionFallback }
);

const TestimonialSection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/Testimonial"),
  { fallback: TestimonialSectionFallback }
);

const CTASection = createLazyComponent(
  () => import("@/app/components/sections/landingpage/CTASection"),
  { fallback: CTASectionFallback }
);

const FooterSection = createLazyComponent(
  () => import("@/app/components/layout/footer")
);
interface OptimizedLayoutProps {
  children?: React.ReactNode;
}

const OptimizedLayout = ({ children }: OptimizedLayoutProps) => {
  return (
    <div className="bg-background dark:bg-background min-h-screen">
      <CleanGridBackground
        rows={100}
        cols={100}
        cellSize={20}
        opacity={0.03}
        borderOpacity={0.8}
        aria-hidden="true"
      />
      <Navbar />
      <main id="main-content" className="relative" role="main">
        {/* Hero section loads immediately for LCP */}
        <section aria-labelledby="hero-heading">
          <HeroSection />
        </section>

        {/* Below-the-fold sections use intersection-based lazy loading */}
        <IntersectionLazy>
          <section aria-labelledby="about-heading">
            <CICTSection />
          </section>
        </IntersectionLazy>

        <IntersectionLazy>
          <section aria-labelledby="story-heading">
            <StorySection />
          </section>
        </IntersectionLazy>

        <IntersectionLazy>
          <section aria-labelledby="programs-heading">
            <OfferSection />
          </section>
        </IntersectionLazy>

        <IntersectionLazy>
          <section aria-labelledby="news-heading">
            <NewsSection />
          </section>
        </IntersectionLazy>

        <IntersectionLazy>
          <section aria-labelledby="faq-heading">
            <FAQsSection />
          </section>
        </IntersectionLazy>

        <IntersectionLazy>
          <section aria-labelledby="testimonials-heading">
            <TestimonialSection />
          </section>
        </IntersectionLazy>

        <IntersectionLazy>
          <section aria-labelledby="cta-heading">
            <CTASection />
          </section>
        </IntersectionLazy>

        <IntersectionLazy>
          <FooterSection />
        </IntersectionLazy>

        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};

export default OptimizedLayout;
