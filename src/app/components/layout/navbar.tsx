"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Logo from "@/app/lib/CICT.png";
import { ThemeToggle } from "@/app/components/theme-toggle";

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

  // Handle scroll detection for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-1" : "py-3"
      }`}
    >
      <div className="justify-center relative flex items-center px-3 py-2">
        <div 
          className={`relative transition-all duration-300 rounded-lg border border-border/50 ${
            isScrolled 
              ? "bg-background/90 backdrop-blur-md shadow-xl" 
              : "bg-background/60 backdrop-blur-sm"
          }`}
        >
          <div className="relative flex items-center px-4 py-2">
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <Image
                    src={Logo}
                    alt="CICT Logo"
                    width={28}
                    height={28}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
                
              </Link>

              <ul className="flex items-center gap-0.5">
                {navigationLinks.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="relative px-2.5 py-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-all duration-300 rounded-md hover:bg-primary/10 group"
                    >
                      {link.title}
                      <span className="absolute inset-x-1 bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                    </Link>
                  </li>
                ))}
                <li className="ml-0.5">
                  <div className="p-0.5 rounded-md hover:bg-primary/10 transition-all duration-300">
                    <ThemeToggle />
                  </div>
                </li>
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-1 text-foreground/70 hover:text-foreground rounded-md hover:bg-primary/10 transition-all duration-300"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-4 h-4">
                <Menu 
                  size={16} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  size={16} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`} 
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-3 pb-2 pt-1 border-t border-border/50">
              <ul className="flex flex-col gap-0.5">
                {navigationLinks.map((link, index) => (
                  <li 
                    key={link.title}
                    className={`transform transition-all duration-300 ${
                      isOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                    }`}
                    style={{transitionDelay: isOpen ? `${index * 50}ms` : '0ms'}}
                  >
                    <Link
                      href={link.href}
                      className="block px-2.5 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-primary/10 rounded-md transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                <li className={`transform transition-all duration-300 ${
                  isOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                }`}
                style={{transitionDelay: isOpen ? '200ms' : '0ms'}}>
                  <div className="flex items-center justify-between px-2.5 py-1.5">
                    <span className="text-sm font-medium text-foreground/70">Theme</span>
                    <ThemeToggle />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}