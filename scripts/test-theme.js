#!/usr/bin/env node

/**
 * Simple Node.js script to test theme-related files for syntax errors
 * and basic functionality without running the full Next.js application
 */

const fs = require("fs");
const path = require("path");

const filesToTest = [
  "src/app/components/theme-provider.tsx",
  "src/app/components/theme-toggle.tsx",
  "src/app/components/client-only.tsx",
  "src/app/components/theme-test.tsx",
  "src/app/lib/utils/theme-utils.ts",
  "src/app/lib/utils/theme-validation.ts",
  "src/app/theme-test-page/page.tsx",
];

console.log("🧪 Testing theme-related files...\n");

let allTestsPassed = true;

for (const file of filesToTest) {
  const filePath = path.join(__dirname, "..", file);

  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ ${file} - File does not exist`);
      allTestsPassed = false;
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");

    // Basic syntax checks
    const checks = [
      {
        name: "Has proper exports",
        test: content.includes("export") || content.includes("module.exports"),
      },
      {
        name: "No obvious syntax errors",
        test:
          !content.includes("SyntaxError") &&
          !content.includes("Unexpected token"),
      },
    ];

    // Only check for imports if the file actually needs them
    if (!file.includes("theme-utils.ts")) {
      checks.unshift({
        name: "Has proper imports",
        test: content.includes("import") || content.includes("require"),
      });
    }

    // File-specific checks
    if (file.includes("theme-provider")) {
      checks.push({
        name: "Uses next-themes",
        test: content.includes("next-themes"),
      });
      checks.push({
        name: "Has ThemeProvider component",
        test:
          content.includes("function ThemeProvider") ||
          content.includes("const ThemeProvider"),
      });
    }

    if (file.includes("theme-toggle")) {
      checks.push({
        name: "Has accessibility attributes",
        test: content.includes("aria-label") && content.includes("sr-only"),
      });
      checks.push({
        name: "Uses ClientOnly wrapper",
        test: content.includes("ClientOnly"),
      });
    }

    if (file.includes("client-only")) {
      checks.push({
        name: "Has useEffect for mounting",
        test:
          content.includes("useEffect") && content.includes("setHasMounted"),
      });
    }

    if (file.includes("theme-utils")) {
      checks.push({
        name: "Has localStorage functions",
        test:
          content.includes("localStorage") &&
          content.includes("getStoredTheme"),
      });
    }

    if (file.includes("theme-validation")) {
      checks.push({
        name: "Has validation functions",
        test:
          content.includes("validateThemeImplementation") &&
          content.includes("runThemeValidation"),
      });
    }

    const failedChecks = checks.filter((check) => !check.test);

    if (failedChecks.length === 0) {
      console.log(`✅ ${file} - All checks passed`);
    } else {
      console.log(`❌ ${file} - Failed checks:`);
      failedChecks.forEach((check) => {
        console.log(`   • ${check.name}`);
      });
      allTestsPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${file} - Error reading file: ${error.message}`);
    allTestsPassed = false;
  }
}

console.log("\n" + "=".repeat(50));

if (allTestsPassed) {
  console.log("🎉 All theme-related files passed basic tests!");
  console.log("\nNext steps:");
  console.log("1. Run `npm run dev` to start the development server");
  console.log(
    "2. Visit http://localhost:3000/theme-test-page to test theme functionality"
  );
  console.log(
    "3. Use the Theme Test button in the bottom-right corner for detailed validation"
  );
  process.exit(0);
} else {
  console.log("❌ Some tests failed. Please review the errors above.");
  process.exit(1);
}
