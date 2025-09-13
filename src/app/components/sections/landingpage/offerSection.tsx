import React from "react";
import { Button } from "@/app/components/ui/button";

import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";
import { Header } from "@/app/components/headerTitleDes";
import { offerSectionData } from "@data/static/offer-section";
import { renderIcon } from "@/app/lib/utils/icon-mapper";

const BenefitItem: React.FC<{ benefit: { icon: string; title: string }; isBottom?: boolean }> = ({
  benefit,
  isBottom,
}) => (
  <div
    className={` ${
      isBottom
        ? "bg-accent/10 border-accent/20 hover:bg-accent/20"
        : "bg-primary/10 border-primary/20 hover:bg-primary/20"
    } flex items-center gap-3 rounded-lg border p-4 transition-all duration-300 hover:scale-105 hover:shadow-md`}
  >
    <div
      className={` ${isBottom ? "text-accent-foreground" : "text-primary"} flex-shrink-0`}
    >
      {renderIcon(benefit.icon, { className: "h-5 w-5" })}
    </div>
    <span
      className={` ${isBottom ? "text-accent-foreground" : "text-primary"} text-sm leading-tight font-medium`}
    >
      {benefit.title}
    </span>
  </div>
);

export default function OfferSection() {
  const { bscs, bsis } = offerSectionData;
  return (
    <section className="w-full">
      {/* BSCS Section - Top */}
      <div className="bg-primary/5 border-border before:border-t-primary/20 after:border-t-primary/10 animate-border-t-pulse relative rounded-t-3xl border-b py-16 transition-all duration-300 before:absolute before:inset-0 before:rounded-t-3xl before:border-t-2 after:absolute after:inset-0 after:rounded-t-3xl after:border-t-2 lg:py-24">
        <MaxWidthWrapper>
          <div className="text-center">
            <Header
              title={bscs.title}
              description="Master software development, AI, and cutting-edge technology"
              badge={bscs.badge}
              badgeVariant="default"
            />
            <p className="text-accent-foreground/80 mx-auto mb-12 max-w-3xl text-base leading-relaxed">
              {bscs.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bscs.benefits.map((benefit, index) => (
              <BenefitItem key={index} benefit={benefit} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-8 text-sm">{bscs.footnote}</p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {bscs.ctaText}
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* BSIS Section - Bottom */}
      <div className="bg-accent/5 border-border before:border-b-accent/20 after:border-b-accent/10 animate-border-b-pulse relative rounded-b-3xl border-b py-16 transition-all duration-300 before:absolute before:inset-0 before:rounded-b-3xl before:border-b-2 after:absolute after:inset-0 after:rounded-b-3xl after:border-b-2 lg:py-24">
        <MaxWidthWrapper>
          <div className="text-center">
            <Header
              title={bsis.title}
              titleClassName="text-accent"
              description="Bridge business and technology for strategic impact"
              badge={bsis.badge}
              badgeVariant="default"
              badgeClassName="bg-accent"
            />
            <p className="text-accent-foreground/70 mx-auto mb-12 max-w-3xl text-base leading-relaxed">
              {bsis.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bsis.benefits.map((benefit, index) => (
              <BenefitItem key={index} benefit={benefit} isBottom />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-accent-foreground/60 mb-8 text-sm">{bsis.footnote}</p>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {bsis.ctaText}
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
