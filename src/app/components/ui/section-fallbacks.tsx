import React from "react";
import { Skeleton } from "./skeleton";
import { MaxWidthWrapper } from "./max-width-wrapper";

/**
 * Fallback components for different section types during lazy loading
 */

export function HeroSectionFallback() {
  return (
    <section
      className="from-background to-muted/20 relative flex min-h-screen items-center justify-center bg-gradient-to-br"
      aria-label="Loading hero section"
      role="region"
      aria-busy="true"
    >
      <MaxWidthWrapper>
        <div className="space-y-8 text-center">
          <Skeleton
            className="mx-auto h-16 w-3/4"
            aria-label="Loading main heading"
          />
          <Skeleton
            className="mx-auto h-6 w-1/2"
            aria-label="Loading subtitle"
          />
          <div className="flex justify-center gap-4">
            <Skeleton
              className="h-12 w-32"
              aria-label="Loading call-to-action button"
            />
            <Skeleton
              className="h-12 w-32"
              aria-label="Loading secondary button"
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export function FeaturesSectionFallback() {
  return (
    <section
      className="py-16 md:py-24"
      aria-label="Loading features section"
      role="region"
      aria-busy="true"
    >
      <MaxWidthWrapper>
        <div className="mb-16 space-y-4 text-center">
          <Skeleton
            className="mx-auto h-12 w-1/2"
            aria-label="Loading features section title"
          />
          <Skeleton
            className="mx-auto h-6 w-2/3"
            aria-label="Loading features section description"
          />
        </div>
        <div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Loading feature items"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4" role="listitem">
              <Skeleton
                className="h-12 w-12"
                aria-label={`Loading feature ${i + 1} icon`}
              />
              <Skeleton
                className="h-6 w-3/4"
                aria-label={`Loading feature ${i + 1} title`}
              />
              <Skeleton
                className="h-4 w-full"
                aria-label={`Loading feature ${i + 1} description line 1`}
              />
              <Skeleton
                className="h-4 w-2/3"
                aria-label={`Loading feature ${i + 1} description line 2`}
              />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export function NewsSectionFallback() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <MaxWidthWrapper>
        <div className="mb-16 space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-1/3" />
          <Skeleton className="mx-auto h-6 w-1/2" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-24" />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export function FAQSectionFallback() {
  return (
    <section
      className="py-16 md:py-24"
      aria-label="Loading frequently asked questions"
      role="region"
      aria-busy="true"
    >
      <MaxWidthWrapper>
        <div className="mb-16 space-y-4 text-center">
          <Skeleton
            className="mx-auto h-12 w-1/3"
            aria-label="Loading FAQ section title"
          />
          <Skeleton
            className="mx-auto h-6 w-1/2"
            aria-label="Loading FAQ section description"
          />
        </div>
        <div
          className="mx-auto max-w-3xl space-y-4"
          role="list"
          aria-label="Loading FAQ items"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="space-y-3 rounded-lg border p-6"
              role="listitem"
            >
              <Skeleton
                className="h-6 w-3/4"
                aria-label={`Loading FAQ question ${i + 1}`}
              />
              <Skeleton
                className="h-4 w-full"
                aria-label={`Loading FAQ answer ${i + 1} line 1`}
              />
              <Skeleton
                className="h-4 w-2/3"
                aria-label={`Loading FAQ answer ${i + 1} line 2`}
              />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export function TestimonialSectionFallback() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <MaxWidthWrapper>
        <div className="mb-16 space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-1/3" />
          <Skeleton className="mx-auto h-6 w-1/2" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-background space-y-4 rounded-lg p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export function CTASectionFallback() {
  return (
    <section className="bg-primary/5 py-16 md:py-24">
      <MaxWidthWrapper>
        <div className="space-y-8 text-center">
          <Skeleton className="mx-auto h-12 w-2/3" />
          <Skeleton className="mx-auto h-6 w-1/2" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

export function StorySectionFallback() {
  return (
    <section className="py-16 md:py-24">
      <MaxWidthWrapper>
        <div className="mb-16 space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-1/3" />
          <Skeleton className="mx-auto h-6 w-1/2" />
        </div>
        <div className="space-y-8">
          <div className="flex justify-center">
            <Skeleton className="h-12 w-96" />
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
