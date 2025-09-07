# CICT v4

A high-performance, enterprise-grade Next.js application built with modern web technologies and optimized for exceptional user experience.

## 🚀 Features

- **⚡ Performance Optimized**: Sub-2s LCP, optimized bundle sizes, and Core Web Vitals compliance
- **🎨 Modern Design System**: Built with shadcn/ui and Tailwind CSS v4
- **🌙 Theme Support**: Seamless dark/light mode switching with persistence
- **📱 Responsive Design**: Mobile-first approach with consistent max-width containers
- **♿ Accessibility First**: WCAG 2.1 AA compliant with comprehensive keyboard navigation
- **🔧 Developer Experience**: TypeScript, ESLint, Prettier, and automated testing
- **📊 Performance Monitoring**: Built-in Lighthouse CI and Core Web Vitals tracking
- **🎭 Loading States**: Comprehensive skeleton UI system for all async boundaries

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router and Turbopack
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict configuration
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Image Optimization**: [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image) and [Cloudinary](https://cloudinary.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Validation**: [Zod](https://zod.dev/) schemas for runtime type safety
- **Testing**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/)
- **Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), and [Husky](https://typicode.github.io/husky/)

## 📋 Prerequisites

- **Node.js**: 18.17 or later
- **Package Manager**: npm, yarn, pnpm, or bun
- **Git**: For version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cictv4.git
cd cictv4
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment variables as needed
# Add your Cloudinary credentials and other configuration
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 5. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components + skeleton components
│   │   ├── layout/       # Layout-specific components (navbar, footer)
│   │   ├── sections/     # Page section components (hero, features)
│   │   └── features/     # Feature-specific components
│   ├── lib/
│   │   ├── data/         # Data files (.ts for static, .json for dynamic)
│   │   ├── utils/        # Utility functions and helpers
│   │   ├── hooks/        # Custom React hooks
│   │   └── schemas/      # Zod validation schemas
│   ├── types/            # TypeScript type definitions
│   └── globals.css       # Single CSS entry point
├── public/
│   └── images/           # Organized by section (hero/, features/, etc.)
└── docs/                 # Project documentation
```

## 🧪 Available Scripts

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing

```bash
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
```

### Performance Analysis

```bash
npm run build:analyze        # Analyze bundle with webpack-bundle-analyzer
npm run bundle:check         # Check bundle sizes against limits
npm run perf:lighthouse      # Run Lighthouse performance tests
npm run perf:core-web-vitals # Monitor Core Web Vitals
npm run perf:check           # Run all performance checks
```

### CSS Optimization

```bash
npm run css:analyze    # Analyze CSS usage and optimization
npm run css:critical   # Extract critical CSS
npm run css:check      # Run all CSS optimization checks
```

### Storybook

```bash
npm run storybook       # Start Storybook development server
npm run build-storybook # Build Storybook for production
```

## 🎨 Design System

### Theme Configuration

The application uses a comprehensive design system built on Tailwind CSS v4:

- **Colors**: Custom color palette with dark/light mode variants
- **Typography**: Optimized font stack with Geist font family
- **Spacing**: Consistent spacing scale using Tailwind's system
- **Components**: Reusable UI components following shadcn/ui patterns

### Max Width Container

All content is wrapped in a `MaxWidthWrapper` component with `max-w-7xl` for consistent layout:

```tsx
<MaxWidthWrapper>
  <YourContent />
</MaxWidthWrapper>
```

### Skeleton Loading States

Comprehensive skeleton UI system for loading states:

- `SkeletonHero` - Hero section loading
- `SkeletonFeatures` - Features grid loading
- `SkeletonNavigation` - Navigation loading
- `SkeletonCard` - Generic card loading

## 📊 Performance Standards

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.0s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FID (First Input Delay)**: < 100ms

### Bundle Size Limits

- **CSS Bundle**: < 8KB gzipped
- **JavaScript Bundle**: Monitored and optimized
- **Image Optimization**: Automatic with next/image and Cloudinary

## 🔧 Data Management

### Static Data

Use TypeScript files for static content with full type safety:

```typescript
// src/app/lib/data/static/hero.ts
export const heroData: HeroData = {
  headline: "Your Headline",
  subline: "Your Subline",
  // ...
};
```

### Dynamic Data

Use JSON files for dynamic arrays and CMS-ready content:

```json
// src/app/lib/data/dynamic/features.json
[
  {
    "iconName": "Zap",
    "title": "Fast Performance",
    "short": "Lightning fast loading times",
    "long": "Optimized for speed with Core Web Vitals compliance"
  }
]
```

### Data Validation

All data structures use Zod schemas for runtime validation:

```typescript
const FeatureSchema = z.object({
  iconName: z.string(),
  title: z.string(),
  short: z.string(),
  long: z.string(),
});
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our guidelines
4. Run tests: `npm run test`
5. Run linting: `npm run lint`
6. Commit changes: `git commit -m 'feat: add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on every push

### Other Platforms

The application can be deployed on any platform that supports Next.js:

- **Netlify**: Use the Next.js build command
- **AWS**: Deploy with AWS Amplify or custom EC2 setup
- **Docker**: Use the included Dockerfile for containerization

## 📚 Documentation

- [Contributing Guidelines](.github/CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Performance Documentation](PERFORMANCE.md)
- [Accessibility Guide](ACCESSIBILITY_IMPROVEMENTS.md)
- [Code Quality Standards](CODE_QUALITY.md)

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) team for the utility-first CSS framework
- All contributors who help make this project better

---

**Built with ❤️ using Next.js and modern web technologies**
