# Skeleton Components Documentation

This directory contains skeleton components for loading states throughout the CICT v4 application.

## Components Overview

### Base Components

#### `skeleton.tsx`

The foundational skeleton component that provides the basic pulsing animation and styling.

```tsx
<Skeleton className="h-4 w-48" />
```

### Variant Components (`skeleton-variants.tsx`)

#### `SkeletonCard`

A card-like skeleton with optional image, title, description, and action areas.

```tsx
<SkeletonCard
  showImage={true}
  showTitle={true}
  showDescription={true}
  showActions={false}
/>
```

**Props:**

- `showImage?: boolean` - Display image placeholder
- `showTitle?: boolean` - Display title placeholder
- `showDescription?: boolean` - Display description lines
- `showActions?: boolean` - Display action button placeholders

#### `SkeletonText`

Multi-line text skeleton with configurable line count and variants.

```tsx
<SkeletonText lines={3} variant="paragraph" />
```

**Props:**

- `lines?: number` - Number of text lines (default: 3)
- `variant?: "default" | "heading" | "paragraph"` - Text style variant

#### `SkeletonAvatar`

Circular avatar placeholder with size variants.

```tsx
<SkeletonAvatar size="md" />
```

**Props:**

- `size?: "sm" | "md" | "lg" | "xl"` - Avatar size

#### `SkeletonButton`

Button-shaped skeleton with variant and size options.

```tsx
<SkeletonButton variant="default" size="md" />
```

**Props:**

- `variant?: "default" | "outline" | "ghost" | "link"` - Button style
- `size?: "sm" | "md" | "lg"` - Button size

### Section Components (`skeleton-sections.tsx`)

#### `SkeletonHero`

Full hero section skeleton with optional scroll indicator.

```tsx
<SkeletonHero showScrollIndicator={true} />
```

#### `SkeletonFeatures`

Features grid section with configurable item count.

```tsx
<SkeletonFeatures itemCount={8} showDescription={true} />
```

#### `SkeletonNavigation`

Navigation bar skeleton with desktop and mobile variants.

```tsx
<SkeletonNavigation showLogo={true} showThemeToggle={true} isMobile={false} />
```

#### `SkeletonFooter`

Complete footer section skeleton.

```tsx
<SkeletonFooter />
```

#### `SkeletonCTA`

Call-to-action section skeleton.

```tsx
<SkeletonCTA />
```

## Storybook Integration

All skeleton components have comprehensive Storybook stories for:

- **Interactive Testing**: Use controls to modify props in real-time
- **Visual Documentation**: See all variants and use cases
- **Theme Testing**: Test components in light and dark themes
- **Responsive Testing**: View mobile and desktop layouts
- **Integration Examples**: See complete page layouts

### Running Storybook

```bash
npm run storybook
```

Navigate to `http://localhost:6006` to explore all skeleton component stories.

## Usage Patterns

### Loading States

Use skeleton components to provide immediate visual feedback while content loads:

```tsx
const MyComponent = () => {
  const { data, loading } = useData();

  if (loading) {
    return <SkeletonCard showImage showTitle showDescription />;
  }

  return <ActualCard data={data} />;
};
```

### Suspense Boundaries

Use as fallback components for React Suspense:

```tsx
<Suspense fallback={<SkeletonFeatures itemCount={6} />}>
  <FeaturesSection />
</Suspense>
```

### Progressive Loading

Show skeleton sections while different parts of the page load:

```tsx
<div>
  <SkeletonNavigation />
  <Suspense fallback={<SkeletonHero />}>
    <HeroSection />
  </Suspense>
  <Suspense fallback={<SkeletonFeatures />}>
    <FeaturesSection />
  </Suspense>
</div>
```

## Design Principles

1. **Consistent Animation**: All skeletons use the same pulse animation
2. **Semantic Structure**: Skeletons match the structure of actual content
3. **Responsive Design**: Components adapt to different screen sizes
4. **Theme Compatibility**: Works with both light and dark themes
5. **Accessibility**: Proper ARIA attributes for screen readers

## Testing

Each component includes comprehensive tests and Storybook stories covering:

- All prop combinations
- Responsive behavior
- Theme variations
- Integration scenarios

## Performance

Skeleton components are lightweight and optimized for:

- Fast rendering during loading states
- Minimal bundle impact
- Smooth animations
- Efficient re-renders
