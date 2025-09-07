"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { ClientOnly } from "@/app/components/client-only";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

const HeroSection = () => {
  // Animation variants
  const animations = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
          duration: 0.6,
        },
      },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1, transition: { duration: 1.4 } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: -80 },
      visible: { opacity: 1, x: 0, transition: { duration: 1.1 } },
    },
    slideRight: {
      hidden: { opacity: 0, x: 80 },
      visible: { opacity: 1, x: 0, transition: { duration: 1.1 } },
    },
    scrollDown: {
      hidden: { opacity: 0, y: 30, scale: 0.9 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.3, delay: 0.8 },
      },
    },
    bounce: {
      animate: {
        y: [0, 12, 0],
        scale: [1, 1.1, 1],
        transition: { duration: 2.0, repeat: Infinity },
      },
    },
  };

  // Static fallback content (rendered on server)
  const StaticContent = () => (
    <section className="relative flex min-h-screen items-center justify-center">
      <MaxWidthWrapper className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <h1
              id="hero-heading"
              className="text-foreground mb-2 w-full text-center text-2xl font-bold select-none sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl"
            >
              <span className="block">PAGBATI!</span>
              <span className="text-primary block text-4xl font-black sm:text-6xl md:text-8xl lg:text-9xl">
                TECHSKHOLAR
              </span>
              <span className="block text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl">
                NG{" "}
                <span className="text-primary text-6xl font-black sm:text-7xl md:text-8xl lg:text-[14rem]">
                  TAGUIG
                </span>
              </span>
            </h1>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 md:mt-12 md:gap-4 lg:mt-16">
              <p className="text-foreground text-lg font-medium select-none sm:text-xl md:text-2xl">
                Tara na!
              </p>
              <button
                className="focus:ring-primary cursor-pointer rounded-md p-2 transition-all duration-300 select-none hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                onClick={() => {
                  const aboutSection = document.querySelector("#about");
                  aboutSection?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="Scroll to about section"
                type="button"
              >
                <ChevronDown
                  className="text-primary h-6 w-6 md:h-8 md:w-8"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );

  // Animated content (rendered only on client)
  const AnimatedContent = () => (
    <section className="relative flex min-h-screen items-center justify-center">
      <MaxWidthWrapper className="py-8 sm:py-12 md:py-16 lg:py-20">
        <motion.div
          className="relative w-full"
          variants={animations.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center text-center">
              <motion.h1
                id="hero-heading"
                className="text-foreground mb-2 w-full text-center text-2xl font-bold select-none sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl"
                variants={animations.fadeUp}
              >
                <motion.span className="block" variants={animations.fadeUp}>
                  PAGBATI!
                </motion.span>
                <motion.span
                  className="text-primary font-heading block text-4xl leading-[0.8] font-black tracking-tight select-none sm:text-6xl md:text-8xl lg:text-[12rem]"
                  variants={animations.scaleIn}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  TECHSKHOLAR
                </motion.span>
                <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
                  <motion.span
                    className="text-foreground font-heading text-center text-3xl font-black select-none sm:text-4xl md:text-5xl lg:text-6xl"
                    variants={animations.slideLeft}
                  >
                    NG
                  </motion.span>
                  <motion.span
                    className="text-primary font-heading text-center text-6xl leading-[0.8] font-black tracking-tight select-none sm:text-7xl md:text-8xl lg:text-[22rem]"
                    variants={animations.slideRight}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    TAGUIG
                  </motion.span>
                </div>
              </motion.h1>
              <motion.div
                className="mt-8 flex flex-col items-center justify-center gap-3 md:mt-12 md:gap-4 lg:mt-16"
                variants={animations.scrollDown}
              >
                <motion.p
                  className="text-foreground text-lg font-medium select-none sm:text-xl md:text-2xl"
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  Tara na!
                </motion.p>
                <motion.button
                  variants={animations.bounce}
                  animate="animate"
                  whileHover={{ scale: 1.3, y: -5, rotate: 180 }}
                  className="focus:ring-primary cursor-pointer rounded-md p-2 transition-all duration-300 select-none focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  onClick={() => {
                    const aboutSection = document.querySelector("#about");
                    aboutSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-label="Scroll to about section"
                  type="button"
                >
                  <ChevronDown
                    className="text-primary h-6 w-6 transition-all duration-300 md:h-8 md:w-8"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );

  return (
    <ClientOnly fallback={<StaticContent />}>
      <AnimatedContent />
    </ClientOnly>
  );
};

export default HeroSection;
