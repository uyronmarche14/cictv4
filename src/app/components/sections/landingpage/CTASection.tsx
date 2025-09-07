"use client";

import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

export default function StrongTeamsCTA() {
  return (
    <section className="bg-background w-full py-20">
      <MaxWidthWrapper
        maxWidth="5xl"
        className="flex flex-col items-center space-y-6 text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Where <span className="text-primary">Strong teams</span> start
        </h2>

        {/* Sub-copy */}
        <p className="max-w-2xl text-lg text-slate-600">
          Strong teams thrive on trust, collaboration, and shared vision.
          <br />
          Together, we can turn ambitious goals into remarkable achievements.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="group shadow-primary/25 rounded-full px-8 py-3 text-base font-semibold shadow-lg"
        >
          <span className="flex items-center gap-2">
            Get Started Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>

        {/* No-signup badge */}
        <Badge
          variant="outline"
          className="border-dashed border-slate-300 px-3 py-1.5 font-medium text-slate-500"
        >
          ✨ No Signup Required · Enjoy!
        </Badge>
      </MaxWidthWrapper>
    </section>
  );
}
