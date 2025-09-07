import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import Logo from "@/app/lib/CICT.png";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

const navigationLinks = [
  { title: "Features", href: "#" },
  { title: "Solution", href: "#" },
  { title: "Customers", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Help", href: "#" },
  { title: "About", href: "#" },
] as const;

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
    label: "Follow us on Twitter",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
    label: "Connect on LinkedIn",
  },
  {
    name: "Facebook",
    href: "#",
    icon: Facebook,
    label: "Like us on Facebook",
  },
  {
    name: "Instagram",
    href: "#",
    icon: Instagram,
    label: "Follow us on Instagram",
  },
] as const;

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-border border-t py-16 md:py-32">
      <MaxWidthWrapper>
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src={Logo}
            alt="CICT Logo"
            width={218}
            height={218}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {navigationLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="mb-8">
          <ul className="flex justify-center gap-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <li key={social.name}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md p-2 transition-colors duration-200"
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Tailark. All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
