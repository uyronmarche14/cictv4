#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * CSS optimization script for production builds
 */

console.log("🎨 Starting CSS optimization...\n");

// Set production environment
process.env.NODE_ENV = "production";

console.log("📦 Building with production optimizations...");

try {
  // Clean previous build
  const buildDir = path.join(process.cwd(), ".next");
  if (fs.existsSync(buildDir)) {
    console.log("🧹 Cleaning previous build...");
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  // Build with production optimizations
  console.log("🔨 Running production build...");
  execSync("npm run build", {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  console.log("✅ Production build completed");
} catch (error) {
  console.error("❌ Build failed:", error.message);

  // Fallback: try to optimize existing CSS files
  console.log("🔄 Attempting to optimize existing CSS files...");

  const staticDir = path.join(process.cwd(), ".next", "static");
  if (!fs.existsSync(staticDir)) {
    console.error("❌ No build files found to optimize");
    process.exit(1);
  }

  optimizeExistingCSS(staticDir);
}

// Run CSS analysis
console.log("\n📊 Running CSS analysis...");
try {
  const analysisResult = require("./analyze-css.js");

  if (analysisResult && !analysisResult.withinLimit) {
    console.log("\n⚠️  CSS bundle still exceeds size limit");
    console.log("🔧 Applying additional optimizations...");

    // Apply additional optimizations
    applyAdditionalOptimizations();
  }
} catch (error) {
  console.log("⚠️  Could not run analysis, continuing with optimization...");
}

console.log("\n✨ CSS optimization complete!");

/**
 * Optimize existing CSS files
 */
function optimizeExistingCSS(staticDir) {
  const getCSSFiles = (dir) => {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...getCSSFiles(fullPath));
      } else if (item.endsWith(".css")) {
        files.push(fullPath);
      }
    }

    return files;
  };

  const cssFiles = getCSSFiles(staticDir);

  cssFiles.forEach((file) => {
    console.log(`🔧 Optimizing ${path.basename(file)}...`);

    let content = fs.readFileSync(file, "utf8");
    const originalSize = content.length;

    // Remove comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove unnecessary whitespace
    content = content.replace(/\s+/g, " ");
    content = content.replace(/;\s*}/g, "}");
    content = content.replace(/{\s*/g, "{");
    content = content.replace(/;\s*/g, ";");

    // Remove empty rules
    content = content.replace(/[^{}]+{\s*}/g, "");

    // Remove duplicate properties (keep last one)
    content = content.replace(
      /([^{}]*){([^{}]*)}/g,
      (match, selector, properties) => {
        const props = {};
        properties.split(";").forEach((prop) => {
          const [key, value] = prop.split(":").map((s) => s.trim());
          if (key && value) {
            props[key] = value;
          }
        });

        const optimizedProps = Object.entries(props)
          .map(([key, value]) => `${key}:${value}`)
          .join(";");

        return optimizedProps ? `${selector.trim()}{${optimizedProps}}` : "";
      }
    );

    const optimizedSize = content.length;
    const savings = (
      ((originalSize - optimizedSize) / originalSize) *
      100
    ).toFixed(1);

    fs.writeFileSync(file, content);
    console.log(
      `   Reduced by ${savings}% (${originalSize} → ${optimizedSize} bytes)`
    );
  });
}

/**
 * Apply additional optimizations if still over limit
 */
function applyAdditionalOptimizations() {
  console.log("🔧 Applying additional CSS optimizations...");

  // Create a minimal critical CSS file
  const criticalCSS = `
/* Minimal critical CSS */
*,*::before,*::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--border)}
html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-sans),system-ui,sans-serif}
body{margin:0;line-height:inherit;background-color:var(--background);color:var(--foreground)}
.max-w-7xl{max-width:80rem}
.mx-auto{margin-left:auto;margin-right:auto}
.px-4{padding-left:1rem;padding-right:1rem}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.flex{display:flex}
.flex-col{flex-direction:column}
.items-center{align-items:center}
.justify-center{justify-content:center}
.justify-between{justify-content:space-between}
.grid{display:grid}
.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
.space-y-4>:not([hidden])~:not([hidden]){margin-top:1rem}
.gap-4{gap:1rem}
.gap-6{gap:1.5rem}
.bg-background{background-color:var(--background)}
.text-foreground{color:var(--foreground)}
.bg-primary{background-color:var(--primary)}
.text-primary-foreground{color:var(--primary-foreground)}
.rounded{border-radius:0.25rem}
.rounded-lg{border-radius:var(--radius-lg)}
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading),sans-serif;font-weight:500;letter-spacing:0.05em;text-transform:uppercase}
@media (min-width:640px){.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:768px){.md\\:px-8{padding-left:2rem;padding-right:2rem}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (min-width:1024px){.lg\\:px-12{padding-left:3rem;padding-right:3rem}}
  `.trim();

  // Write minimal critical CSS
  const criticalPath = path.join(
    process.cwd(),
    "src",
    "app",
    "critical-minimal.css"
  );
  fs.writeFileSync(criticalPath, criticalCSS);

  console.log(`✅ Created minimal critical CSS (${criticalCSS.length} bytes)`);
  console.log("💡 Consider using this for above-the-fold content");
}
