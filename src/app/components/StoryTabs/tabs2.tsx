"use client";
import { CheckCircle2, Sparkles, Target, Zap } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { LazyCldImage } from "@/app/components/ui/lazy-cloudinary";
import { storyTabsData } from "@/app/lib/data/static/story-tabs";
import { renderIcon } from "@/app/lib/utils/icon-mapper";

function Story2() {
  const data = storyTabsData.tab2;
  const features = data.features;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* LEFT: Image */}
        <div className="relative h-full min-h-[500px] w-full overflow-hidden rounded-xl">
          <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent" />
          <LazyCldImage
            src={data.image.src}
            alt={data.image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>

        {/* RIGHT: Content */}
        <div className="order-1 space-y-6 lg:order-2">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 w-fit"
            >
              {data.badge}
            </Badge>

            <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {data.title}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="hover:bg-muted/20 flex items-start gap-4 rounded-lg py-3 transition-colors duration-200"
              >
                <div className="bg-primary/10 text-primary flex-shrink-0 rounded-lg p-2">
                  {renderIcon(feature.icon, { className: "h-5 w-5" })}
                </div>
                <div className="space-y-1">
                  <h3 className="text-foreground font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-primary/20 rounded-full px-8 shadow-lg"
            >
              {data.ctaText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Story2;
