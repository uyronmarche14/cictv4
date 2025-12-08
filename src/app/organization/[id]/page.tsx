'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { organizationPages } from '@/lib/data/organizationPages';
import { organizations } from '@/components/organizations/organizationData';
import ContactCTASection from '@/components/CTASection';

// Layout Components
import HeroSection from '@/components/organizations/sections/HeroSection';
import BlogDescription from '@/components/organizations/sections/BlogDescription';
import MissionVisionSection from '@/components/organizations/sections/MissionVisionSection';
import ProgramsTabs from '@/components/organizations/sections/ProgramsTabs';
import AchievementsSection from '@/components/organizations/sections/AchievementsSection';
import EventsSection from '@/components/organizations/sections/EventsSection';
import TeamSection from '@/components/organizations/sections/TeamSection';

export default function OrganizationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.id as string;

  const org = organizationPages.find(o => o.id === orgId);
  // Fallback to empty members array if organizations data is missing or mismatched
  const orgWithMembers = organizations.find(o => o.id === orgId) || { members: [] };

  if (!org) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Organization Not Found</h1>
          <p className="text-muted-foreground">The organization you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      
      {/* 1. Hero Section */}
      <HeroSection org={org} />

      <div className="max-w-7xl mx-auto space-y-24 pb-24">
        
        {/* 2. Blog Style Description */}
        <BlogDescription 
            description={org.description} 
            name={org.fullName} 
            color={org.color} 
        />

        {/* 3. Mission & Vision */}
        <MissionVisionSection 
            mission={org.mission} 
            vision={org.vision} 
            color={org.color} 
        />

        {/* 4. Programs (New Tab Design) */}
        <ProgramsTabs 
            programs={org.programs} 
            color={org.color} 
        />

        {/* 5. Achievements */}
        <AchievementsSection 
            achievements={org.achievements} 
            color={org.color} 
        />

        {/* 6. Events */}
        <EventsSection 
            events={org.events} 
            color={org.color} 
        />

        {/* 7. Team */}
        <TeamSection 
            members={orgWithMembers.members} 
            color={org.color} 
            orgName={org.name}
        />
        
      </div>

      {/* 9. Global Contact CTA */}
      <ContactCTASection />
      
    </main>
  );
}
