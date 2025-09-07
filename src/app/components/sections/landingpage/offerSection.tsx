import React from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Code,
  Brain,
  Database,
  Shield,
  Cloud,
  Search,
  Briefcase,
  Users,
  Settings,
  TrendingUp,
  ShoppingCart,
  Lightbulb,
} from "lucide-react";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";
import { Header } from "@/app/components/headerTitleDes";

interface CourseBenefit {
  icon: React.ReactNode;
  title: string;
}

const BSCSBenefits: CourseBenefit[] = [
  { icon: <Code className="h-5 w-5" />, title: "Software Development" },
  { icon: <Brain className="h-5 w-5" />, title: "Artificial Intelligence" },
  { icon: <Settings className="h-5 w-5" />, title: "Machine Learning" },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Data Structures & Algorithms",
  },
  { icon: <Shield className="h-5 w-5" />, title: "Systems Programming" },
  { icon: <Shield className="h-5 w-5" />, title: "Cybersecurity" },
  { icon: <Cloud className="h-5 w-5" />, title: "Cloud Computing" },
  { icon: <Search className="h-5 w-5" />, title: "Research & Innovation" },
];

const BSISBenefits: CourseBenefit[] = [
  { icon: <Briefcase className="h-5 w-5" />, title: "Business Analysis" },
  { icon: <Database className="h-5 w-5" />, title: "Information Management" },
  { icon: <Settings className="h-5 w-5" />, title: "IT Project Management" },
  { icon: <Users className="h-5 w-5" />, title: "Enterprise Systems" },
  { icon: <Database className="h-5 w-5" />, title: "Database Design" },
  { icon: <ShoppingCart className="h-5 w-5" />, title: "E-Commerce Solutions" },
  { icon: <TrendingUp className="h-5 w-5" />, title: "Digital Transformation" },
  { icon: <Lightbulb className="h-5 w-5" />, title: "System Strategy" },
];

const BenefitItem: React.FC<{ benefit: CourseBenefit; isBottom?: boolean }> = ({
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
      {benefit.icon}
    </div>
    <span
      className={` ${isBottom ? "text-accent-foreground" : "text-primary"} text-sm leading-tight font-medium`}
    >
      {benefit.title}
    </span>
  </div>
);

export default function OfferSection() {
  return (
    <section className="w-full">
      {/* BSCS Section - Top */}
      <div className="bg-primary/5 border-border before:border-t-primary/20 after:border-t-primary/10 animate-border-t-pulse relative rounded-t-3xl border-b py-16 transition-all duration-300 before:absolute before:inset-0 before:rounded-t-3xl before:border-t-2 after:absolute after:inset-0 after:rounded-t-3xl after:border-t-2 lg:py-24">
        <MaxWidthWrapper>
          <div className="text-center">
            <Header
              title="Bachelor of Science in Computer Science"
              description="Master software development, AI, and cutting-edge technology"
              badge="BSCS"
              badgeVariant="default"
            />
            <p className="text-accent-foreground/80 mx-auto mb-12 max-w-3xl text-base leading-relaxed">
              Our comprehensive BSCS program equips you with the skills to excel
              in software development, artificial intelligence, and
              computational problem-solving. From fundamental algorithms to
              advanced machine learning applications, you'll be prepared for the
              tech industry's most challenging roles.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BSCSBenefits.map((benefit, index) => (
              <BenefitItem key={index} benefit={benefit} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-8 text-sm">
              *Plus specialized tracks in cybersecurity, cloud computing, and
              research
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore BSCS Program
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* BSIS Section - Bottom */}
      <div className="bg-accent/5 border-border before:border-b-accent/20 after:border-b-accent/10 animate-border-b-pulse relative rounded-b-3xl border-b py-16 transition-all duration-300 before:absolute before:inset-0 before:rounded-b-3xl before:border-b-2 after:absolute after:inset-0 after:rounded-b-3xl after:border-b-2 lg:py-24">
        <MaxWidthWrapper>
          <div className="text-center">
            <Header
              title="Bachelor of Science in Information Systems"
              titleClassName="text-accent"
              description="Bridge business and technology for strategic impact"
              badge="BSIS"
              badgeVariant="default"
              badgeClassName="bg-accent"
            />
            <p className="text-accent-foreground/70 mx-auto mb-12 max-w-3xl text-base leading-relaxed">
              Our BSIS program focuses on the strategic use of technology in
              business. Learn to design, implement, and manage information
              systems that drive business value and enable digital
              transformation across organizations.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BSISBenefits.map((benefit, index) => (
              <BenefitItem key={index} benefit={benefit} isBottom />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-accent-foreground/60 mb-8 text-sm">
              *Emphasis on business-technology alignment and strategic
              management
            </p>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Explore BSIS Program
            </Button>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
