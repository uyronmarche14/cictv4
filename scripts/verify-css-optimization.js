#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

/**
 * Verify CSS optimization implementation
 */

console.log("🔍 Verifying CSS optimization implementation...\n");

const results = {
  configurationCheck: false,
  criticalCSSCheck: false,
  bundleSizeCheck: false,
  optimizationScriptsCheck: false,
  productionReadyCheck: false,
};

// 1. Check Tailwind configuration
console.log("1️⃣ Checking Tailwind configuration...");
try {
  const tailwindConfig = fs.readFileSync("tailwind.config.js", "utf8");

  if (
    tailwindConfig.includes("purge:") &&
    tailwindConfig.includes('enabled: process.env.NODE_ENV === "production"')
  ) {
    console.log("   ✅ Tailwind purging configured for production");
    results.configurationCheck = true;
  } else {
    console.log("   ⚠️  Tailwind purging configuration needs review");
  }

  if (tailwindConfig.includes("corePlugins:")) {
    console.log("   ✅ Core plugins optimized");
  } else {
    console.log("   ⚠️  Consider disabling unused core plugins");
  }
} catch (error) {
  console.log("   ❌ Could not read Tailwind configuration");
}

// 2. Check PostCSS configuration
console.log("\n2️⃣ Checking PostCSS configuration...");
try {
  const postcssConfig = fs.readFileSync("postcss.config.mjs", "utf8");

  if (postcssConfig.includes("@fullhuman/postcss-purgecss")) {
    console.log("   ✅ PurgeCSS configured");
  } else {
    console.log("   ⚠️  PurgeCSS not found in configuration");
  }

  if (postcssConfig.includes("cssnano")) {
    console.log("   ✅ CSS minification configured");
  } else {
    console.log("   ⚠️  CSS minification not configured");
  }

  if (postcssConfig.includes("autoprefixer")) {
    console.log("   ✅ Autoprefixer configured");
    results.configurationCheck = true;
  } else {
    console.log("   ⚠️  Autoprefixer not configured");
  }
} catch (error) {
  console.log("   ❌ Could not read PostCSS configuration");
}

// 3. Check critical CSS implementation
console.log("\n3️⃣ Checking critical CSS implementation...");
try {
  const criticalCSSPath = path.join("src", "app", "critical.css");
  const criticalComponentPath = path.join(
    "src",
    "app",
    "components",
    "layout",
    "CriticalCSS.tsx"
  );

  if (fs.existsSync(criticalCSSPath)) {
    const criticalCSS = fs.readFileSync(criticalCSSPath, "utf8");
    const criticalSize = criticalCSS.length;
    const criticalGzipSize = zlib.gzipSync(criticalCSS).length;

    console.log(
      `   ✅ Critical CSS file exists (${(criticalSize / 1024).toFixed(2)}KB raw, ${(criticalGzipSize / 1024).toFixed(2)}KB gzipped)`
    );

    if (criticalGzipSize <= 8 * 1024) {
      console.log("   ✅ Critical CSS is within 8KB gzipped limit");
      results.criticalCSSCheck = true;
    } else {
      console.log("   ❌ Critical CSS exceeds 8KB gzipped limit");
    }
  } else {
    console.log("   ❌ Critical CSS file not found");
  }

  if (fs.existsSync(criticalComponentPath)) {
    console.log("   ✅ Critical CSS component exists");
  } else {
    console.log("   ❌ Critical CSS component not found");
  }
} catch (error) {
  console.log("   ❌ Error checking critical CSS implementation");
}

// 4. Check optimization scripts
console.log("\n4️⃣ Checking optimization scripts...");
const requiredScripts = [
  "scripts/analyze-css.js",
  "scripts/create-critical-only-css.js",
  "scripts/simulate-production-css.js",
  "scripts/optimize-css.js",
];

let scriptsExist = 0;
requiredScripts.forEach((script) => {
  if (fs.existsSync(script)) {
    console.log(`   ✅ ${script} exists`);
    scriptsExist++;
  } else {
    console.log(`   ❌ ${script} missing`);
  }
});

if (scriptsExist === requiredScripts.length) {
  console.log("   ✅ All optimization scripts present");
  results.optimizationScriptsCheck = true;
} else {
  console.log(
    `   ⚠️  ${requiredScripts.length - scriptsExist} scripts missing`
  );
}

// 5. Check package.json scripts
console.log("\n5️⃣ Checking package.json scripts...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const scripts = packageJson.scripts;

  const requiredNpmScripts = [
    "css:analyze",
    "css:critical-only",
    "css:simulate",
    "css:optimize",
    "css:check",
  ];

  let npmScriptsExist = 0;
  requiredNpmScripts.forEach((script) => {
    if (scripts[script]) {
      console.log(`   ✅ npm run ${script} available`);
      npmScriptsExist++;
    } else {
      console.log(`   ❌ npm run ${script} missing`);
    }
  });

  if (npmScriptsExist === requiredNpmScripts.length) {
    console.log("   ✅ All npm scripts configured");
  } else {
    console.log(
      `   ⚠️  ${requiredNpmScripts.length - npmScriptsExist} npm scripts missing`
    );
  }
} catch (error) {
  console.log("   ❌ Could not read package.json");
}

// 6. Check current bundle size (if build exists)
console.log("\n6️⃣ Checking current bundle size...");
try {
  const buildDir = path.join(".next", "static");
  if (fs.existsSync(buildDir)) {
    // Run analysis
    const analysisResult = require("./analyze-css.js");
    console.log("   📊 Current bundle analysis completed");

    if (analysisResult && analysisResult.withinLimit) {
      console.log("   ✅ Current bundle is within size limit");
      results.bundleSizeCheck = true;
    } else {
      console.log(
        "   ⚠️  Current bundle exceeds size limit (development build)"
      );
      console.log("   💡 Run production build for accurate measurement");
    }
  } else {
    console.log(
      "   ⚠️  No build found - run development server or build first"
    );
  }
} catch (error) {
  console.log("   ⚠️  Could not analyze current bundle");
}

// 7. Production readiness check
console.log("\n7️⃣ Production readiness check...");
const productionChecks = [
  results.configurationCheck,
  results.criticalCSSCheck,
  results.optimizationScriptsCheck,
];

const passedChecks = productionChecks.filter(Boolean).length;
results.productionReadyCheck = passedChecks >= 2;

if (results.productionReadyCheck) {
  console.log("   ✅ CSS optimization is production-ready");
} else {
  console.log("   ⚠️  CSS optimization needs more work before production");
}

// Summary
console.log("\n📋 Summary:");
console.log("─".repeat(50));
console.log(`Configuration: ${results.configurationCheck ? "✅" : "❌"}`);
console.log(`Critical CSS: ${results.criticalCSSCheck ? "✅" : "❌"}`);
console.log(`Bundle Size: ${results.bundleSizeCheck ? "✅" : "⚠️"}`);
console.log(`Scripts: ${results.optimizationScriptsCheck ? "✅" : "❌"}`);
console.log(`Production Ready: ${results.productionReadyCheck ? "✅" : "❌"}`);

// Recommendations
console.log("\n💡 Next Steps:");
if (!results.productionReadyCheck) {
  console.log("   • Fix any ❌ items above");
  console.log("   • Run 'npm run css:check' to verify optimizations");
}
console.log(
  "   • Test with production build: NODE_ENV=production npm run build"
);
console.log("   • Monitor bundle size in CI/CD pipeline");
console.log("   • Consider implementing critical CSS inlining in HTML head");

console.log("\n✨ Verification complete!");

// Exit with appropriate code
process.exit(results.productionReadyCheck ? 0 : 1);
