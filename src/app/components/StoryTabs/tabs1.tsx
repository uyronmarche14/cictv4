"use client";
import { Card } from "@/app/components/ui/card";

import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { CheckCircle2, Sparkles, Target, Zap } from "lucide-react";
import { LazyCldImage } from "@/app/components/ui/lazy-cloudinary";

function Story1() {
  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "AI-Powered Mapping",
      description:
        "Generate comprehensive sitemaps with intelligent AI analysis",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Strategic Planning",
      description: "Scope projects better with clear content architecture",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Results",
      description: "Create complete sitemaps in seconds, not hours",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Clear Structure",
      description: "Identify key pages and sections with precision",
    },
  ];

  return (
    <div className="w-full max-w-full md:mx-auto">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        {/* LEFT: Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 w-fit"
            >
              Sitemap Builder
            </Badge>

            <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              The best way to start your new project
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Transform your ideas into structured reality. Our AI-powered
              sitemap builder creates comprehensive project architectures from
              just a few sentences about your vision.
            </p>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="hover:bg-muted/20 flex items-start gap-4 rounded-lg py-3 transition-colors duration-200"
              >
                <div className="bg-primary/10 text-primary flex-shrink-0 rounded-lg p-2">
                  {feature.icon}
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
              Get Started
            </Button>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="relative h-full min-h-[500px] w-full overflow-hidden rounded-xl">
          <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent" />
          <LazyCldImage
            src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660318/459388087_1210395166778357_1242381946816835441_n_vrx5th.jpg"
            alt="AI-powered sitemap generation dashboard"
            fill
            className="h-full w-full object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      </div>
    </div>
  );
}

export default Story1;
