/**
 * Accessibility testing utilities
 * Provides functions to test and validate accessibility implementations
 */

interface AccessibilityTestResult {
  passed: boolean;
  message: string;
  element?: HTMLElement;
}

interface AccessibilityTestSuite {
  testName: string;
  results: AccessibilityTestResult[];
  passed: boolean;
  score: number;
}

/**
 * Test if an element has proper ARIA labels
 */
export function testAriaLabels(element: HTMLElement): AccessibilityTestResult {
  const interactiveElements = element.querySelectorAll(
    'button, [role="button"], a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const elementsWithoutLabels: HTMLElement[] = [];

  interactiveElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const hasAriaLabel = htmlEl.hasAttribute("aria-label");
    const hasAriaLabelledBy = htmlEl.hasAttribute("aria-labelledby");
    const hasTitle = htmlEl.hasAttribute("title");
    const hasTextContent = htmlEl.textContent?.trim();
    const hasAltText = htmlEl.hasAttribute("alt");

    if (
      !hasAriaLabel &&
      !hasAriaLabelledBy &&
      !hasTitle &&
      !hasTextContent &&
      !hasAltText
    ) {
      elementsWithoutLabels.push(htmlEl);
    }
  });

  return {
    passed: elementsWithoutLabels.length === 0,
    message:
      elementsWithoutLabels.length === 0
        ? "All interactive elements have proper labels"
        : `${elementsWithoutLabels.length} interactive elements missing labels`,
    element: elementsWithoutLabels[0],
  };
}

/**
 * Test heading hierarchy
 */
export function testHeadingHierarchy(
  element: HTMLElement
): AccessibilityTestResult {
  const headings = Array.from(
    element.querySelectorAll("h1, h2, h3, h4, h5, h6")
  );
  const headingLevels = headings.map((h) => parseInt(h.tagName.charAt(1)));

  let hierarchyValid = true;
  let previousLevel = 0;

  for (const level of headingLevels) {
    if (previousLevel === 0) {
      // First heading should be h1
      if (level !== 1) {
        hierarchyValid = false;
        break;
      }
    } else {
      // Subsequent headings should not skip levels
      if (level > previousLevel + 1) {
        hierarchyValid = false;
        break;
      }
    }
    previousLevel = level;
  }

  return {
    passed: hierarchyValid,
    message: hierarchyValid
      ? "Heading hierarchy is properly structured"
      : "Heading hierarchy has gaps or incorrect structure",
  };
}

/**
 * Test keyboard navigation
 */
export function testKeyboardNavigation(
  element: HTMLElement
): AccessibilityTestResult {
  const focusableElements = element.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const elementsWithoutTabIndex: HTMLElement[] = [];

  focusableElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const tabIndex = htmlEl.tabIndex;

    // Check if element is properly focusable
    if (tabIndex < 0 && !htmlEl.hasAttribute("tabindex")) {
      elementsWithoutTabIndex.push(htmlEl);
    }
  });

  return {
    passed: elementsWithoutTabIndex.length === 0,
    message:
      elementsWithoutTabIndex.length === 0
        ? "All interactive elements are keyboard accessible"
        : `${elementsWithoutTabIndex.length} elements may not be keyboard accessible`,
    element: elementsWithoutTabIndex[0],
  };
}

/**
 * Test focus indicators
 */
export function testFocusIndicators(
  element: HTMLElement
): AccessibilityTestResult {
  const focusableElements = element.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const elementsWithoutFocusStyles: HTMLElement[] = [];

  focusableElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlEl);
    const classList = Array.from(htmlEl.classList);

    // Check for focus-related classes or styles
    const hasFocusClasses = classList.some(
      (className) =>
        className.includes("focus:") ||
        className.includes("focus-visible:") ||
        className.includes("focus-within:")
    );

    const hasOutlineStyle =
      computedStyle.outline !== "none" && computedStyle.outline !== "";

    if (!hasFocusClasses && !hasOutlineStyle) {
      elementsWithoutFocusStyles.push(htmlEl);
    }
  });

  return {
    passed: elementsWithoutFocusStyles.length === 0,
    message:
      elementsWithoutFocusStyles.length === 0
        ? "All focusable elements have focus indicators"
        : `${elementsWithoutFocusStyles.length} elements missing focus indicators`,
    element: elementsWithoutFocusStyles[0],
  };
}

/**
 * Test semantic HTML usage
 */
export function testSemanticHTML(
  element: HTMLElement
): AccessibilityTestResult {
  const semanticElements = element.querySelectorAll(
    "main, nav, header, footer, section, article, aside, h1, h2, h3, h4, h5, h6"
  );

  const hasMain = element.querySelector("main") !== null;
  const hasNav = element.querySelector("nav") !== null;
  const hasHeadings = element.querySelector("h1, h2, h3, h4, h5, h6") !== null;

  const score = (hasMain ? 1 : 0) + (hasNav ? 1 : 0) + (hasHeadings ? 1 : 0);
  const maxScore = 3;

  return {
    passed: score >= 2, // At least 2 out of 3 semantic elements
    message: `Semantic HTML usage: ${score}/${maxScore} key elements found`,
  };
}

/**
 * Test loading states accessibility
 */
export function testLoadingStates(
  element: HTMLElement
): AccessibilityTestResult {
  const loadingElements = element.querySelectorAll(
    '[aria-busy="true"], [aria-live]'
  );
  const skeletonElements = element.querySelectorAll(
    '[class*="skeleton"], [class*="loading"]'
  );

  let hasProperLoadingLabels = true;
  const elementsWithoutLabels: HTMLElement[] = [];

  loadingElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const hasAriaLabel = htmlEl.hasAttribute("aria-label");
    const hasAriaLabelledBy = htmlEl.hasAttribute("aria-labelledby");

    if (!hasAriaLabel && !hasAriaLabelledBy) {
      hasProperLoadingLabels = false;
      elementsWithoutLabels.push(htmlEl);
    }
  });

  return {
    passed: hasProperLoadingLabels,
    message: hasProperLoadingLabels
      ? "Loading states have proper accessibility labels"
      : `${elementsWithoutLabels.length} loading elements missing accessibility labels`,
    element: elementsWithoutLabels[0],
  };
}

/**
 * Run comprehensive accessibility test suite
 */
export function runAccessibilityTests(
  element: HTMLElement = document.body
): AccessibilityTestSuite {
  const tests = [
    { name: "ARIA Labels", test: testAriaLabels },
    { name: "Heading Hierarchy", test: testHeadingHierarchy },
    { name: "Keyboard Navigation", test: testKeyboardNavigation },
    { name: "Focus Indicators", test: testFocusIndicators },
    { name: "Semantic HTML", test: testSemanticHTML },
    { name: "Loading States", test: testLoadingStates },
  ];

  const results = tests.map(({ name, test }) => ({
    testName: name,
    ...test(element),
  }));

  const passedTests = results.filter((result) => result.passed).length;
  const totalTests = results.length;
  const score = Math.round((passedTests / totalTests) * 100);

  return {
    testName: "Accessibility Test Suite",
    results,
    passed: passedTests === totalTests,
    score,
  };
}

/**
 * Generate accessibility report
 */
export function generateAccessibilityReport(
  testSuite: AccessibilityTestSuite
): string {
  const { testName, results, passed, score } = testSuite;

  let report = `\n=== ${testName} ===\n`;
  report += `Overall Score: ${score}% (${results.filter((r) => r.passed).length}/${results.length} tests passed)\n`;
  report += `Status: ${passed ? "PASSED" : "NEEDS IMPROVEMENT"}\n\n`;

  results.forEach((result, index) => {
    const status = result.passed ? "✅" : "❌";
    report += `${index + 1}. ${status} ${result.testName}: ${result.message}\n`;
  });

  report += "\n";

  return report;
}

/**
 * Log accessibility test results to console
 */
export function logAccessibilityResults(
  element: HTMLElement = document.body
): void {
  const testSuite = runAccessibilityTests(element);
  const report = generateAccessibilityReport(testSuite);

  console.group("🔍 Accessibility Test Results");
  console.log(report);

  // Log failed tests with more details
  const failedTests = testSuite.results.filter((result) => !result.passed);
  if (failedTests.length > 0) {
    console.group("❌ Failed Tests Details");
    failedTests.forEach((result) => {
      console.log(`${result.testName}: ${result.message}`);
      if (result.element) {
        console.log("Problem element:", result.element);
      }
    });
    console.groupEnd();
  }

  console.groupEnd();
}
