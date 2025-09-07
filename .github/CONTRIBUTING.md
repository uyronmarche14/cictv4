# Contributing to CICT v4

Thank you for your interest in contributing to CICT v4! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)
- [Code Quality Standards](#code-quality-standards)
- [Performance Guidelines](#performance-guidelines)
- [Submitting Changes](#submitting-changes)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](../CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun package manager
- Git

### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/cictv4.git
   cd cictv4
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components + skeleton components
│   │   ├── layout/       # Layout-specific components
│   │   ├── sections/     # Page section components
│   │   └── features/     # Feature-specific components
│   ├── lib/
│   │   ├── data/         # Data files (.ts for static, .json for dynamic)
│   │   ├── utils/        # Utility functions
│   │   ├── hooks/        # Custom React hooks
│   │   └── schemas/      # Zod validation schemas
│   ├── types/            # TypeScript type definitions
│   └── globals.css       # Single CSS entry point
├── public/
│   └── images/
│       ├── hero/
│       ├── features/
│       └── sections/
└── config files
```

## Development Guidelines

### CSS Architecture

- **Single CSS Entry Point**: All CSS imports must go through `src/app/globals.css`
- **No Component-Level CSS Imports**: Use Tailwind classes instead of importing CSS files in components
- **Tailwind First**: Prefer Tailwind utility classes over custom CSS
- **Design Tokens**: Use the established design token system for consistency

### Component Guidelines

- **TypeScript First**: All components must be written in TypeScript with proper type definitions
- **Props Interface**: Define clear interfaces for all component props
- **Max Width Wrapper**: All page content should be wrapped in `MaxWidthWrapper` with `max-w-7xl`
- **Skeleton States**: Implement skeleton loading states for all async boundaries

### Performance Best Practices

- **Image Optimization**: Use `next/image` or `CldImage` for all images with proper `priority` settings
- **Code Splitting**: Use dynamic imports for heavy components
- **Bundle Size**: Keep bundle sizes minimal - monitor with `npm run bundle:check`
- **Core Web Vitals**: Maintain LCP < 2s, CLS < 0.1, FID < 100ms

### Data Management

- **Static Data**: Use TypeScript files (`.ts`) for static content with type safety
- **Dynamic Data**: Use JSON files (`.json`) for arrays and dynamic content
- **Validation**: All data must have corresponding Zod schemas for runtime validation
- **Type Safety**: Generate TypeScript types from Zod schemas where possible

## Code Quality Standards

### Linting and Formatting

- **ESLint**: All code must pass ESLint checks (`npm run lint`)
- **Prettier**: All code must be formatted with Prettier (`npm run format`)
- **Pre-commit Hooks**: Husky will automatically run linting and formatting on commit
- **Import Organization**: Imports should be automatically sorted and organized

### TypeScript

- **Strict Mode**: The project uses strict TypeScript configuration
- **No Any Types**: Avoid using `any` - use proper type definitions
- **Interface Definitions**: Define interfaces for all data structures
- **Type Exports**: Export types from a centralized `types/` directory

### Testing

- **Unit Tests**: Write unit tests for utility functions and complex logic
- **Component Tests**: Use React Testing Library for component testing
- **Storybook**: Create stories for all reusable UI components
- **Accessibility Tests**: Include accessibility testing with axe-core

## Performance Guidelines

### Bundle Optimization

- **Tree Shaking**: Ensure unused code is eliminated from bundles
- **Dynamic Imports**: Use for non-critical components and features
- **Image Optimization**: Implement proper image sizing and lazy loading
- **CSS Purging**: Unused CSS should be automatically purged in production

### Monitoring

- **Bundle Analysis**: Run `npm run bundle:analyze` to analyze bundle sizes
- **Performance Testing**: Use `npm run perf:check` for performance validation
- **Lighthouse CI**: Automated performance testing on pull requests
- **Core Web Vitals**: Monitor and maintain performance metrics

## Submitting Changes

### Pull Request Process

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the development guidelines above
   - Write tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**

   ```bash
   npm run lint
   npm run format:check
   npm run test
   npm run build
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Pull Request Guidelines

- **Clear Description**: Provide a clear description of what your PR does
- **Link Issues**: Reference any related issues
- **Screenshots**: Include screenshots for UI changes
- **Performance Impact**: Note any performance implications
- **Breaking Changes**: Clearly mark any breaking changes

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run linting
npm run lint

# Run formatting check
npm run format:check

# Run performance tests
npm run perf:check
```

### Test Coverage

- Aim for high test coverage on utility functions
- Test component behavior, not implementation details
- Include accessibility tests for interactive components
- Test error states and edge cases

## Documentation

### Code Documentation

- **JSDoc Comments**: Document complex functions and components
- **README Updates**: Update README.md for significant changes
- **Type Documentation**: Use TypeScript for self-documenting code
- **Storybook Stories**: Document component usage with Storybook

### Data Management Documentation

When adding new data structures:

1. **Define TypeScript Interfaces**: Create proper type definitions
2. **Create Zod Schemas**: Add runtime validation schemas
3. **Update Documentation**: Document the data structure in relevant docs
4. **Provide Examples**: Include usage examples in comments or docs

## Getting Help

- **Issues**: Check existing issues or create a new one
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Code Review**: Request reviews from maintainers
- **Documentation**: Refer to the project documentation and README

## Recognition

Contributors will be recognized in our README.md and release notes. Thank you for helping make CICT v4 better!
