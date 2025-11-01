'use client';

import { useParams, useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { ArrowLeft, CheckCircle2, Calendar as CalendarIcon, Mail } from 'lucide-react';
import { organizationPages } from '@/app/lib/data/organizationPages';
import { Button } from '@/app/components/ui/button';
import DetailPageCTA from '@/app/components/sections/DetailPageCTA';
import DetailPageFooter from '@/app/components/sections/DetailPageFooter';

export default function OrganizationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.id as string;

  const org = organizationPages.find(o => o.id === orgId);

  if (!org) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Organization Not Found</h1>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <div className="border-b border-border/50 sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-3">
            <CldImage 
              src={org.logo} 
              alt={org.name} 
              width={32} 
              height={32} 
              className="h-8 w-8 object-contain" 
              style={{ width: "auto", height: "auto" }}
            />
            <span className="font-bold" style={{ color: org.color.primary }}>{org.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Overlay */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <CldImage
          src={org.heroImage}
          alt={org.fullName}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-8 right-8 animate-pulse">
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
            Est. {org.established}
          </div>
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold mb-6">
                Student Organization
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
                {org.fullName}
              </h1>
              <p className="text-2xl text-white/90 mb-6">{org.tagline}</p>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                {org.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Mission & Vision - Enhanced Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{
                borderColor: `${org.color.primary}30`,
                backgroundColor: `${org.color.primary}05`
              }}>
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: org.color.primary }}>
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 mt-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">{org.mission}</p>
            </div>
            <div className="group relative p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              style={{
                borderColor: `${org.color.secondary}30`,
                backgroundColor: `${org.color.secondary}05`
              }}>
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: org.color.secondary }}>
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 mt-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">{org.vision}</p>
            </div>
          </div>
        </section>

        {/* Programs - Interactive Grid */}
        <section className="mb-20">
          <h2 className="text-balance text-4xl font-bold lg:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {org.programs.map((program, idx) => (
              <div key={idx} className="group relative p-8 rounded-2xl border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at top right, ${org.color.primary}, transparent)`
                  }} />
                <div className="relative">
                  <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {program.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements - Animated Cards */}
        <section className="mb-20">
          <h2 className="text-balance text-4xl font-bold lg:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-12 text-center">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {org.achievements.map((achievement, idx) => (
              <div key={idx} className="group p-6 rounded-xl border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: `${org.color.primary}03` }}>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                    style={{ backgroundColor: `${org.color.primary}15` }}>
                    <CheckCircle2 className="h-5 w-5" style={{ color: org.color.primary }} />
                  </div>
                  <span className="text-foreground font-medium leading-relaxed">{achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events - Timeline with Animations */}
        <section className="mb-20">
          <h2 className="text-balance text-4xl font-bold lg:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-12 text-center">
            Events & Activities
          </h2>
          <div className="space-y-6">
            {org.events.map((event, idx) => (
              <div key={idx} className="group relative p-8 rounded-2xl border border-border/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                style={{ backgroundColor: `${org.color.secondary}03` }}>
                <div className="absolute top-6 right-6">
                  <div className="px-4 py-2 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${org.color.secondary}15`,
                      color: org.color.secondary
                    }}>
                    {event.frequency}
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${org.color.secondary}20` }}>
                    <CalendarIcon className="h-6 w-6" style={{ color: org.color.secondary }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits - Interactive Grid */}
        <section className="mb-20">
          <h2 className="text-balance text-4xl font-bold lg:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-12 text-center">
            Member Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {org.benefits.map((benefit, idx) => (
              <div key={idx} className="group flex items-start gap-4 p-6 rounded-xl border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="p-2 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${org.color.primary}20` }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: org.color.primary }} />
                </div>
                <span className="text-foreground font-medium leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Join Info - Call to Action */}
        <section className="mb-20">
          <div className="relative p-12 rounded-3xl overflow-hidden"
            style={{ backgroundColor: `${org.color.primary}10` }}>
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
              style={{
                background: `radial-gradient(circle, ${org.color.primary}, transparent)`
              }} />
            <div className="relative">
              <h2 className="text-balance text-4xl font-bold lg:text-5xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-8 text-center">
                Ready to Join Us?
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">Requirements</h3>
                  <div className="space-y-4">
                    {org.joinInfo.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="p-1 rounded-full mt-1"
                          style={{ backgroundColor: `${org.color.primary}20` }}>
                          <CheckCircle2 className="h-4 w-4" style={{ color: org.color.primary }} />
                        </div>
                        <span className="text-foreground leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">How to Apply</h3>
                  <div className="space-y-4">
                    {org.joinInfo.process.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: org.color.primary }}>
                          {idx + 1}
                        </div>
                        <span className="text-foreground leading-relaxed pt-1">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-4 p-6 rounded-2xl border-2 border-border/50 bg-background/50 backdrop-blur-sm">
                  <Mail className="h-6 w-6" style={{ color: org.color.primary }} />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Get in touch</div>
                    <a href={`mailto:${org.joinInfo.contact}`}
                      className="text-lg font-bold hover:underline transition-colors"
                      style={{ color: org.color.primary }}>
                      {org.joinInfo.contact}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <DetailPageCTA
        title={`Become Part of ${org.name}`}
        subtitle="Interested in Joining?"
        description={org.description}
        primaryButtonText="Contact Us"
        primaryButtonHref={`mailto:${org.joinInfo.contact}`}
        contactEmail={org.joinInfo.contact}
      />

      <DetailPageFooter />
    </main>
  );
}
