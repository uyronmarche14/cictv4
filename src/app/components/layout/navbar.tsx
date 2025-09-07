"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Logo from "@/app/lib/CICT.png";
import { createLazyComponent } from "@/app/lib/utils/lazy-loading";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";
import { useKeyboardNavigation } from "@/app/lib/hooks/use-keyboard-navigation";
import { KEYBOARD_KEYS } from "@/app/lib/utils/accessibility";

// Lazy load ThemeToggle since it's not critical for initial render
const ThemeToggle = createLazyComponent(
  () =>
    import("@/app/components/theme-toggle").then((mod) => ({
      default: mod.ThemeToggle,
    })),
  {
    fallback: () => (
      <div className="bg-muted/20 h-9 w-9 animate-pulse rounded-md p-2" />
    ),
  }
);

const navigationLinks = [
  { title: "Home", href: "#" },
  { title: "About", href: "#" },
  { title: "Programs", href: "#" },
  { title: "Events", href: "#" },
  { title: "Contact", href: "#" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLElement | null>(null);
  const desktopNavRef = useRef<HTMLElement | null>(null);

  // Handle scroll detection for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for mobile menu
  useKeyboardNavigation({
    containerRef: mobileMenuRef,
    enableArrowKeys: true,
    enableHomeEnd: true,
    enableEscape: true,
    onEscape: () => setIsOpen(false),
    customKeyHandlers: {
      [KEYBOARD_KEYS.ENTER]: (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "A") {
          setIsOpen(false);
        }
      },
      [KEYBOARD_KEYS.SPACE]: (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "A") {
          event.preventDefault();
          target.click();
          setIsOpen(false);
        }
      },
    },
  });

  // Keyboard navigation for desktop menu
  useKeyboardNavigation({
    containerRef: desktopNavRef,
    enableArrowKeys: true,
    enableHomeEnd: true,
    customKeyHandlers: {
      [KEYBOARD_KEYS.ENTER]: (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "A") {
          target.click();
        }
      },
    },
  });

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-1" : "py-3"
      }`}
      role="banner"
    >
      <MaxWidthWrapper>
        <div className="relative flex items-center justify-center px-3 py-2">
          <div
            className={`border-border/50 relative rounded-lg border transition-all duration-300 ${
              isScrolled
                ? "bg-background/90 shadow-xl backdrop-blur-md"
                : "bg-background/60 backdrop-blur-sm"
            }`}
          >
            <div className="relative flex items-center px-4 py-2">
              {/* Desktop Navigation */}
              <nav
                ref={desktopNavRef}
                className="hidden items-center gap-4 md:flex"
                role="navigation"
                aria-label="Main navigation"
              >
                <Link
                  href="/"
                  className="group focus:ring-primary flex items-center gap-2 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  aria-label="CICT Taguig - Home"
                >
                  <div className="relative">
                    <Image
                      src={Logo}
                      alt="CICT Taguig Logo"
                      width={28}
                      height={28}
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                </Link>

                <ul className="flex items-center gap-0.5" role="menubar">
                  {navigationLinks.map((link) => (
                    <li key={link.title} role="none">
                      <Link
                        href={link.href}
                        className="text-foreground/70 hover:text-foreground hover:bg-primary/10 group focus:ring-primary relative rounded-md px-2.5 py-1 text-sm font-medium transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                        role="menuitem"
                        aria-label={`Navigate to ${link.title}`}
                        tabIndex={0}
                      >
                        {link.title}
                        <span
                          className="bg-primary absolute inset-x-1 bottom-0.5 h-0.5 scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 group-focus:scale-x-100"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                  <li className="ml-0.5" role="none">
                    <div className="hover:bg-primary/10 rounded-md p-0.5 transition-all duration-300">
                      <ThemeToggle />
                    </div>
                  </li>
                </ul>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground/70 hover:text-foreground hover:bg-primary/10 focus:ring-primary relative rounded-md p-1 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none md:hidden"
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                type="button"
              >
                <div className="relative h-4 w-4">
                  <Menu
                    size={16}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                  <X
                    size={16}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav
              ref={mobileMenuRef}
              id="mobile-menu"
              className={`overflow-hidden transition-all duration-300 md:hidden ${
                isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
              role="navigation"
              aria-label="Mobile navigation"
              aria-hidden={!isOpen}
            >
              <div className="border-border/50 border-t px-3 pt-1 pb-2">
                <ul className="flex flex-col gap-0.5" role="menu">
                  {navigationLinks.map((link, index) => (
                    <li
                      key={link.title}
                      className={`transform transition-all duration-300 ${
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                      }}
                      role="none"
                    >
                      <Link
                        href={link.href}
                        className="text-foreground/70 hover:text-foreground hover:bg-primary/10 focus:ring-primary block rounded-md px-2.5 py-1.5 text-sm font-medium transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                        onClick={() => setIsOpen(false)}
                        role="menuitem"
                        aria-label={`Navigate to ${link.title}`}
                        tabIndex={isOpen ? 0 : -1}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                  <li
                    className={`transform transition-all duration-300 ${
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-2 opacity-0"
                    }`}
                    style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
                    role="none"
                  >
                    <div className="flex items-center justify-between px-2.5 py-1.5">
                      <span
                        className="text-foreground/70 text-sm font-medium"
                        id="theme-label"
                      >
                        Theme
                      </span>
                      <div tabIndex={isOpen ? 0 : -1}>
                        <ThemeToggle />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
