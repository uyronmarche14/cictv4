import { ThemeToggle } from "@/app/components/theme-toggle";
import { MaxWidthWrapper } from "@/app/components/ui/max-width-wrapper";

/**
 * Test page for verifying theme functionality across different routes
 * This page should only be accessible in development mode
 */
export default function ThemeTestPage() {
  if (process.env.NODE_ENV !== "development") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <MaxWidthWrapper>
          <p className="text-muted-foreground text-center">
            This page is only available in development mode.
          </p>
        </MaxWidthWrapper>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-200">
      <MaxWidthWrapper maxWidth="4xl" className="py-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Theme Test Page</h1>
          <ThemeToggle />
        </header>

        <div className="space-y-8">
          <section className="bg-card text-card-foreground rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Theme Colors Test</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-primary text-primary-foreground rounded p-4">
                <p className="font-medium">Primary</p>
                <p className="text-sm opacity-90">Primary foreground</p>
              </div>
              <div className="bg-secondary text-secondary-foreground rounded p-4">
                <p className="font-medium">Secondary</p>
                <p className="text-sm opacity-90">Secondary foreground</p>
              </div>
              <div className="bg-muted text-muted-foreground rounded p-4">
                <p className="font-medium">Muted</p>
                <p className="text-sm opacity-90">Muted foreground</p>
              </div>
              <div className="bg-accent text-accent-foreground rounded p-4">
                <p className="font-medium">Accent</p>
                <p className="text-sm opacity-90">Accent foreground</p>
              </div>
            </div>
          </section>

          <section className="bg-card text-card-foreground rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Interactive Elements
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-2 transition-colors">
                  Primary Button
                </button>
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded px-4 py-2 transition-colors">
                  Secondary Button
                </button>
                <button className="border-input bg-background hover:bg-accent hover:text-accent-foreground rounded border px-4 py-2 transition-colors">
                  Outline Button
                </button>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Test input field"
                  className="border-input bg-background text-foreground focus:ring-ring w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none"
                />
                <textarea
                  placeholder="Test textarea"
                  rows={3}
                  className="border-input bg-background text-foreground focus:ring-ring w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none"
                />
              </div>
            </div>
          </section>

          <section className="bg-card text-card-foreground rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">
              Theme Persistence Test
            </h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Test theme persistence by:
              </p>
              <ol className="list-inside list-decimal space-y-2 text-sm">
                <li>Switch to dark/light theme using the toggle above</li>
                <li>Refresh this page (Ctrl+R or Cmd+R)</li>
                <li>
                  Navigate to the{" "}
                  <a href="/" className="text-primary hover:underline">
                    home page
                  </a>{" "}
                  and back
                </li>
                <li>Open a new tab with this page</li>
                <li>Verify the theme persists in all cases</li>
              </ol>

              <div className="bg-muted mt-4 rounded p-4">
                <p className="mb-2 text-sm font-medium">
                  Current Theme Status:
                </p>
                <div className="space-y-1 font-mono text-xs">
                  <div>
                    Document class:{" "}
                    {typeof window !== "undefined"
                      ? document.documentElement.className
                      : "SSR"}
                  </div>
                  <div>
                    LocalStorage:{" "}
                    {typeof window !== "undefined"
                      ? localStorage.getItem("cictv4-theme") || "not set"
                      : "SSR"}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card text-card-foreground rounded-lg border p-6">
            <h2 className="mb-4 text-2xl font-semibold">Accessibility Test</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Test accessibility features:
              </p>
              <ul className="list-inside list-disc space-y-2 text-sm">
                <li>Use Tab key to navigate to the theme toggle</li>
                <li>Press Space or Enter to activate the theme toggle</li>
                <li>Use a screen reader to verify ARIA labels are announced</li>
                <li>Check that focus indicators are visible</li>
                <li>Verify color contrast meets WCAG standards</li>
              </ul>

              <div className="mt-4">
                <ThemeToggle />
                <p className="text-muted-foreground mt-2 text-xs">
                  ↑ Additional theme toggle for testing
                </p>
              </div>
            </div>
          </section>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
