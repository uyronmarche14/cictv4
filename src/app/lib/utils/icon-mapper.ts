import React from "react";
import {
  Target,
  Eye,
  Brain,
  Code,
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
  ArrowRight,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Award,
  GraduationCap,
  Handshake,
  Laptop,
  Trophy,
  Calendar,
  Cpu,
  Bot,
  type LucideIcon,
} from "lucide-react";

// Icon mapping for string-based icon references
const iconMap: Record<string, LucideIcon> = {
  // CICT Section icons
  Target,
  Eye,
  Brain,
  
  // Program icons
  Code,
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
  
  // Story tabs icons
  Award,
  GraduationCap,
  Handshake,
  Laptop,
  Trophy,
  Calendar,
  Cpu,
  Bot,
  
  // UI icons
  ArrowRight,
  
  // Social icons
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
};

/**
 * Get a Lucide icon component by string name
 * @param iconName - The name of the icon as a string
 * @returns The corresponding Lucide icon component or null if not found
 */
export function getIcon(iconName: string): LucideIcon | null {
  return iconMap[iconName] || null;
}

/**
 * Get a Lucide icon component by string name with fallback
 * @param iconName - The name of the icon as a string
 * @param fallback - Fallback icon to use if the requested icon is not found
 * @returns The corresponding Lucide icon component or the fallback
 */
export function getIconWithFallback(
  iconName: string,
  fallback: LucideIcon = Target
): LucideIcon {
  return iconMap[iconName] || fallback;
}

/**
 * Check if an icon exists in the icon map
 * @param iconName - The name of the icon as a string
 * @returns True if the icon exists, false otherwise
 */
export function hasIcon(iconName: string): boolean {
  return iconName in iconMap;
}

/**
 * Get all available icon names
 * @returns Array of all available icon names
 */
export function getAvailableIcons(): string[] {
  return Object.keys(iconMap);
}

/**
 * Render an icon component with props
 * @param iconName - The name of the icon as a string
 * @param props - Props to pass to the icon component
 * @returns JSX element or null if icon not found
 */
export function renderIcon(
  iconName: string,
  props?: React.ComponentProps<LucideIcon>
): React.ReactElement | null {
  const IconComponent = getIcon(iconName);
  if (!IconComponent) {
    return null;
  }
  return React.createElement(IconComponent, props);
}