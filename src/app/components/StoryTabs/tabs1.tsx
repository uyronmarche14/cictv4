"use client"
import { Card } from '@/app/components/ui/card';

import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { CheckCircle2, Sparkles, Target, Zap } from 'lucide-react';
import { CldImage } from 'next-cloudinary';

function Story1() {
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
        {/* LEFT: Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="w-fit bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
            >
              Sitemap Builder
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              The best way to start your new project
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform your ideas into structured reality. Our AI-powered
              sitemap builder creates comprehensive project architectures from
              just a few sentences about your vision.
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
              Get Started
            </Button>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="relative aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CldImage
            src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1756660318/459388087_1210395166778357_1242381946816835441_n_vrx5th.jpg"
            alt="AI-powered sitemap generation dashboard"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      </div>
    </div>
  );
}

export default Story1