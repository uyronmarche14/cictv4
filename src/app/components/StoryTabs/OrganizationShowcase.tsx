'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { Target, Eye, ChevronRight } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import { cn } from '@/app/lib/utils';
import { organizations } from './organizationData';
import MemberCard from './MemberCard';

interface OrganizationShowcaseProps {
  organizationId: string;
}

export default function OrganizationShowcase({ organizationId }: OrganizationShowcaseProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const organization = organizations.find(org => org.id === organizationId);

  if (!organization) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Organization not found</p>
        </div>
      </div>
    );
  }

  const handleMemberClick = (memberId: string) => {
    // Navigate to member profile page
    window.location.href = `/member/${memberId}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section - Modern Minimal Design */}
      <div className="relative mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className="px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: organization.color.primary,
                  color: 'white'
                }}
              >
                {organization.name}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Est. {organization.established}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground">
              {organization.fullName}
            </h1>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {organization.description}
            </p>

            {/* Core Values */}
            {organization.values && organization.values.length > 0 && (
              <div className="pt-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {organization.values.slice(0, 5).map((value, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Image */}
          <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-lg">
            <CldImage
              src={organization.banner}
              alt={`${organization.name} banner`}
              fill
              className={cn(
                "object-cover transition-all duration-700 ease-out",
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              onLoad={() => setImageLoaded(true)}
              priority
            />

            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section - Minimal Design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        <div className="group p-6 rounded-xl border border-border bg-card hover:border-foreground/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${organization.color.primary}15` }}
            >
              <Target className="h-4 w-4" style={{ color: organization.color.primary }} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Mission</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {organization.mission}
          </p>
        </div>

        <div className="group p-6 rounded-xl border border-border bg-card hover:border-foreground/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${organization.color.secondary}15` }}
            >
              <Eye className="h-4 w-4" style={{ color: organization.color.secondary }} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Vision</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {organization.vision}
          </p>
        </div>
      </div>

      {/* Team Section - Centered Grid Layout (1 + 4 + 4) */}
      <div className="mb-16">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold lg:text-4xl bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-2">
            Meet Our Team
          </h2>
          <p className="text-sm text-muted-foreground">
            The dedicated individuals who make it all happen
          </p>
        </div>

        {/* First Row - 1 centered larger card */}
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <MemberCard
              key={organization.members[0].id}
              member={organization.members[0]}
              organizationColor={organization.color}
              onClick={() => handleMemberClick(organization.members[0].id)}
            />
          </div>
        </div>

        {/* Second Row - 4 larger cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 max-w-7xl mx-auto px-4">
          {organization.members.slice(1, 5).map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              organizationColor={organization.color}
              onClick={() => handleMemberClick(member.id)}
            />
          ))}
        </div>

        {/* Third Row - 4 larger cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
          {organization.members.slice(5, 9).map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              organizationColor={organization.color}
              onClick={() => handleMemberClick(member.id)}
            />
          ))}
        </div>
      </div>

      {/* Call to Action - Minimal Design */}
      <div className="flex justify-center">
        <a
          href={`/organization/${organization.id}`}
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 hover:gap-3"
          style={{ backgroundColor: organization.color.primary }}
        >
          <span>Learn More About {organization.name}</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}