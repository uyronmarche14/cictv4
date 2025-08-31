"use client"
import { Card } from '@/app/components/ui/card';

import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle2, Sparkles, Target, Zap } from 'lucide-react';
import { CldImage } from 'next-cloudinary';

function Story2() {
  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: 'AI-Powered Mapping',
      description: 'Generate comprehensive sitemaps with intelligent AI analysis',
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: 'Strategic Planning',
      description: 'Scope projects better with clear content architecture',
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: 'Instant Results',
      description: 'Create complete sitemaps in seconds, not hours',
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: 'Clear Structure',
      description: 'Identify key pages and sections with precision',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* LEFT: Image */}
        <div className="relative aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CldImage
            src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660320/cict4_qqksfh.jpg"
            alt="AI-powered sitemap generation dashboard"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>

        {/* RIGHT: Content */}
        <div className="space-y-6 order-1 lg:order-2">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="w-fit bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
            >
              Advanced Features
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Powerful tools for modern teams
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              From concept to completion, our platform provides everything you need to build, manage, and scale your digital presence with confidence.
            </p>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 py-3 rounded-lg hover:bg-muted/20 transition-colors duration-200"
              >
                <div className="flex-shrink-0 p-2 bg-primary/10 text-primary rounded-lg">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <Button
              size="lg"
              className="rounded-full px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Story2