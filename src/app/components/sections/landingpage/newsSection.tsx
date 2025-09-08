import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CldImage } from "next-cloudinary";

import { Button } from "@/app/components/ui/button";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

export default function NewsSection() {
  return (
    <section className="bg-background py-16 md:py-32">
      <MaxWidthWrapper className="space-y-8 md:space-y-12">
        <CldImage
          className="border-primary rounded-[var(--radius)] border border-1 shadow-[0_2px_4px_-1px_var(--primary)] transition-transform duration-300 ease-in-out hover:translate-y-[-8px]"
          src="https://res.cloudinary.com/ddnxfpziq/image/upload/v1755790148/529718384_122100992648966778_7029427848362639164_n_geskab.jpg"
          width="1800"
          height="1800"
          alt="CICT students in classroom"
          loading="lazy"
        />

        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <h2 className="text-foreground text-heading text-4xl font-medium">
            CICT NEWS AND EVENTS YOUR ONE STOP TO NEWS AND UPDATES{" "}
          </h2>
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Stay updated with the latest news, events, and announcements from
              the College of Information and Communication Technology.
            </p>

            <Button
              asChild
              variant="secondary"
              size="sm"
              className="bg-primary hover:bg-accent gap-1 pr-1.5"
            >
              <Link href="#">
                <span>View All News</span>
                <ChevronRight className="size-2" />
              </Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
