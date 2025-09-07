# Data Management System

This directory contains the organized data structure for the CICT v4 application, following the design specifications for clean data architecture.

## Directory Structure

```
data/
├── static/          # TypeScript files for static content
│   ├── hero.ts
│   ├── navigation.ts
│   ├── cict-section.ts
│   ├── cta-section.ts
│   ├── story-section.ts
│   └── footer.ts
├── dynamic/         # JSON files for dynamic content
│   ├── programs.json
│   ├── testimonials.json
│   └── faqs.json
├── index.ts         # Main exports
└── README.md        # This file
```

## Data Organization Strategy

### Static Data (TypeScript files)

- **Purpose**: Content that rarely changes and benefits from type safety
- **Format**: TypeScript files with exported interfaces and data objects
- **Benefits**:
  - Full TypeScript IntelliSense support
  - Compile-time type checking
  - Better developer experience
  - Tree-shaking optimization

### Dynamic Data (JSON files)

- **Purpose**: Content that changes frequently or comes from external sources
- **Format**: JSON files with structured data
- **Benefits**:
  - Easy CMS integration
  - Runtime data updates
  - Simple content management
  - External API compatibility

## Usage Examples

### Loading Static Data

```typescript
import { loadStaticData } from "@/app/lib/data";

// Load hero section data
const heroData = await loadStaticData("hero");

// Load multiple static data items
const { navigation, footer } = await preloadStaticData([
  "navigation",
  "footer",
]);
```

### Loading Dynamic Data

```typescript
import { loadDynamicData } from "@/app/lib/data";

// Load programs data
const programsData = await loadDynamicData("programs");

// Load testimonials
const testimonials = await loadDynamicData("testimonials");
```

### Using Icons

```typescript
import { getIcon, renderIcon } from "@/app/lib/data";

// Get icon component
const TargetIcon = getIcon("Target");

// Render icon with props
const iconElement = renderIcon("Target", {
  size: 24,
  className: "text-primary",
});
```

## Type Safety

All data structures are fully typed with TypeScript interfaces defined in `/types/data.ts`. This ensures:

- Compile-time validation of data structure
- IntelliSense support in IDEs
- Prevention of runtime errors due to missing properties
- Clear documentation of expected data shapes

## Adding New Data

### Adding Static Data

1. Create a new TypeScript file in `static/`
2. Define the interface in `/types/data.ts`
3. Add the data key to `StaticDataKey` type
4. Update the `StaticDataMap` type
5. Add the case to `loadStaticData` function

### Adding Dynamic Data

1. Create a new JSON file in `dynamic/`
2. Define the interface in `/types/data.ts`
3. Add the data key to `DynamicDataKey` type
4. Update the `DynamicDataMap` type
5. Add the case to `loadDynamicData` function

## Icon Management

Icons are managed through a centralized mapping system:

- All icons are imported from `lucide-react`
- String-based icon references in data files
- Runtime icon resolution with fallbacks
- Type-safe icon rendering utilities

## Validation System

All data is validated using Zod schemas to ensure type safety and data integrity:

### Runtime Validation

```typescript
// Validation is enabled by default
const heroData = await loadStaticData("hero"); // Validates automatically

// Disable validation for performance (not recommended)
const heroData = await loadStaticData("hero", { validate: false });
```

### Error Handling

```typescript
import { DataValidationError } from "@/app/lib/data";

try {
  const data = await loadDynamicData("faqs");
} catch (error) {
  if (error instanceof DataValidationError) {
    console.error("Validation failed:", error.getSummary());
    // Handle validation error gracefully
  }
}
```

### Testing Data Integrity

```typescript
import { testAllDataValidation } from "@/app/lib/data";

// Test all data files during development
const result = await testAllDataValidation();
if (!result.success) {
  console.error(
    "Data validation failed:",
    result.staticErrors,
    result.dynamicErrors
  );
}
```

## Best Practices

1. **Static vs Dynamic**: Use static data for content that benefits from type safety, dynamic data for frequently changing content
2. **Icon Names**: Use exact Lucide React icon names in data files
3. **Image Paths**: Use relative paths from the public directory
4. **Validation**: Always keep validation enabled in production for data integrity
5. **Performance**: Use preloading functions for multiple data items to optimize loading
6. **Error Handling**: Use the provided error handling utilities for graceful degradation

## Validation Schemas

### Static Data Schemas

Located in `/lib/schemas/static-data.ts`:

- `HeroDataSchema` - Hero section validation
- `NavigationDataSchema` - Navigation structure validation
- `CICTSectionDataSchema` - CICT section with features validation
- `CTASectionDataSchema` - Call-to-action section validation
- `StorySectionDataSchema` - Story section validation
- `FooterDataSchema` - Footer with social links validation

### Dynamic Data Schemas

Located in `/lib/schemas/dynamic-data.ts`:

- `ProgramsDataSchema` - BSCS/BSIS programs validation
- `TestimonialsSchema` - Testimonials array validation
- `FAQDataSchema` - FAQ structure with consistency checks

### Custom Validations

- **FAQ Consistency**: Ensures all question categories match defined topics
- **URL Validation**: Validates social links and image URLs
- **Icon Validation**: Ensures icon names exist in the icon mapping
- **Required Fields**: All critical content fields are required

## Migration Notes

The data has been migrated from the previous `content.json` structure to this organized system:

- FAQ data moved from `content.json` to `dynamic/faqs.json`
- Hardcoded component content extracted to appropriate static/dynamic files
- All data now has proper TypeScript interfaces and Zod validation schemas
- Icon references converted to string-based mapping system
- Runtime validation added for all data loading operations
