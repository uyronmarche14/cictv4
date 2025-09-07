import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Target, Eye, Brain } from "lucide-react";
import Image from "next/image";
import logo from "@/app/lib/CICT.png";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

const features = [
  {
    title: "MISSSION",
    icon: Target,
    description:
      "Skip the manual tasks and complex setups. With Streamline, you can focus on what matters most while the system handles the rest.",
  },
  {
    title: "VISION",
    icon: Eye,
    description:
      "Dont overspend on unnecessary tools or teams. Keep your operations lean and efficient by automating your workflows with Streamline.",
  },
  {
    title: "PHILOSOPHY",
    icon: Brain,
    description:
      "Say goodbye to managing multiple platforms. Streamline takes care of all the heavy lifting, ensuring consistent results with minimal hassle.",
  },
];

const StreamlineSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center py-16">
      <MaxWidthWrapper>
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="space-y-4 lg:w-full">
            <p className="text-primary text-sm font-medium tracking-wider uppercase">
              What is CICT?
            </p>
            <h2 className="text-primary text-4xl leading-tight font-bold lg:text-5xl">
              COLLEGE OF INFORMATION AND
              <br />
              COMMUNICATION TECHNOLOGY
            </h2>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Streamline optimizes your workflow from start to finish. It
              gathers information, generates reports, automates tasks, and
              delivers results—all in one seamless system.
            </p>
          </div>

          {/* Logo/Icon */}
          <div className="flex justify-center lg:w-1/2 lg:justify-end">
            <div className="relative h-48 w-48">
              <Image
                src={logo}
                alt="CICT Logo"
                width={218}
                height={218}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-border bg-card hover:bg-card/95 shadow-primary hover:shadow-primary relative overflow-hidden rounded-lg border shadow-md shadow-sm transition-all duration-300 hover:shadow-md hover:shadow-xl"
            >
              {/* Accent border */}
              <div className="bg-primary absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100" />

              <CardContent className="relative p-6">
                <div className="bg-primary/10 group-hover:bg-primary/20 mb-5 flex h-12 w-12 items-center justify-center rounded-md transition-colors duration-300">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground group-hover:text-primary mb-3 text-xl font-semibold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default StreamlineSection;
