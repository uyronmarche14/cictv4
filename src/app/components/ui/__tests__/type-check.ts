// Type checking verification for skeleton components
import {
  Skeleton,
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonHero,
  SkeletonFeatures,
  SkeletonNavigation,
  SkeletonFooter,
  SkeletonCTA,
  type SkeletonCardProps,
  type SkeletonTextProps,
  type SkeletonAvatarProps,
  type SkeletonButtonProps,
  type SkeletonHeroProps,
  type SkeletonFeaturesProps,
  type SkeletonNavigationProps,
} from "../index";

// Verify all components and types are properly exported
const components = {
  Skeleton,
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonHero,
  SkeletonFeatures,
  SkeletonNavigation,
  SkeletonFooter,
  SkeletonCTA,
};

// Verify type interfaces work correctly
const cardProps: SkeletonCardProps = {
  showImage: true,
  showTitle: true,
  showDescription: true,
  showActions: false,
  className: "test-class",
};

const textProps: SkeletonTextProps = {
  lines: 3,
  variant: "heading",
  className: "test-class",
};

const avatarProps: SkeletonAvatarProps = {
  size: "lg",
  className: "test-class",
};

const buttonProps: SkeletonButtonProps = {
  variant: "outline",
  size: "md",
  className: "test-class",
};

const heroProps: SkeletonHeroProps = {
  showScrollIndicator: true,
  className: "test-class",
};

const featuresProps: SkeletonFeaturesProps = {
  itemCount: 8,
  showDescription: true,
  className: "test-class",
};

const navigationProps: SkeletonNavigationProps = {
  showLogo: true,
  showThemeToggle: true,
  isMobile: false,
  className: "test-class",
};

// Export for verification
export {
  components,
  cardProps,
  textProps,
  avatarProps,
  buttonProps,
  heroProps,
  featuresProps,
  navigationProps,
};
