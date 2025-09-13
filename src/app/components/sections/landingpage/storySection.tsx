"use client";

import { lazy } from "react";
import { Header } from "@/app/components/headerTitleDes";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";
import { storySectionData } from "@data/static/story-section";

const Tabs = lazy(() => import("@/app/components/StoryTabs/index"));

const StorySection = () => {
  const { title, description, badge } = storySectionData;
  return (
    <section className="w-full py-8">
      <MaxWidthWrapper>
        <Header
          title={title}
          description={description}
          badge={badge}
          badgeVariant="default"
        />
        <Tabs />
      </MaxWidthWrapper>
    </section>
  );
};

export default StorySection;
