import React from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Target, Eye, Brain } from "lucide-react";
import Image from "next/image";
import logo from "@/app/lib/CICT.png";

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
    <section className="relative min-h-screen flex items-center justify-center py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-12">
          <div className="lg:w-1/2 space-y-4">
            <p className="text-sm text-primary font-medium tracking-wider uppercase">
              What is CICT?
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary leading-tight">
              COLLEGE OF INFORMATION AND
              <br />
              COMMUNICATION TECHNOLOGY
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Streamline optimizes your workflow from start to finish. It
              gathers information, generates reports, automates tasks, and
              delivers results—all in one seamless system.
            </p>
          </div>

          {/* Logo/Icon */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-48 h-48">
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
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative border border-border bg-card hover:bg-card/95 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden shadow-md shadow-primary hover:shadow-xl hover:shadow-primary"
            >
              {/* Accent border */}
              <div className="absolute inset-x-0 top-0 h-1 bg-primary transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-0" />

              <CardContent className="relative p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default StreamlineSection;
