"use client";

import React from "react";
import { lazy } from "react";
import { Header } from "@/app/components/headerTitleDes";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

const Tabs = lazy(() => import("@/app/components/StoryTabs/index"));

const StorySection = () => {
  return (
    <section className="w-full py-8">
      <MaxWidthWrapper>
        <Header
          title="Transform Your Vision"
          description="Discover how our AI-powered platform revolutionizes project planning and team collaboration."
          badge="The Journey"
          badgeVariant="default"
        />
        <Tabs />
      </MaxWidthWrapper>
    </section>
  );
};

export default StorySection;
