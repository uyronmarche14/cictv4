"use client";

import React from "react";
import { lazy } from "react";
import { Card } from '@/app/components/ui/card';

const Tabs = lazy(
  () => import("@/app/components/StoryTabs/index")
);

const StorySection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto py-8">
      <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center py-12 px-6">
        <div className="inline-flex items-center justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
            Our Story
          </span>
        </div>
        <h2 className="text-balance text-4xl font-bold lg:text-6xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Transform Your Vision
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Discover how our AI-powered platform revolutionizes project planning and team collaboration.
        </p>
      </div>
      <Tabs />
    </section>
  );
};

export default StorySection;
