import { useEffect } from "react";

/**
 * Critical CSS component for inlining essential styles
 * This ensures the most important styles are loaded immediately
 */
export function CriticalCSS() {
  useEffect(() => {
    // Load non-critical CSS asynchronously
    const loadNonCriticalCSS = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/css/non-critical.css";
      link.media = "print";
      link.onload = function() {
        (this as HTMLLinkElement).media = "all";
      };
      document.head.appendChild(link);
    };

    // Load after initial render
    const timer = setTimeout(loadNonCriticalCSS, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `/* Critical CSS - Essential styles only */

/* CSS Reset - Minimal */
*,*::before,*::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--border)}
html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-sans),system-ui,sans-serif}
body{margin:0;line-height:inherit;background-color:var(--background);color:var(--foreground)}

/* CSS Variables - Essential only */
:root{
--primary:#6e29f6;
--primary-foreground:#ffffff;
--secondary:#f629a8;
--secondary-foreground:#ffffff;
--accent:#29f6d2;
--accent-foreground:#0f0f0f;
--background:#ffffff;
--foreground:#111111;
--card:#ffffff;
--card-foreground:#111111;
--muted:#f3f3f3;
--muted-foreground:#666666;
--border:#e5e5e5;
--input:#e5e5e5;
--ring:#d1d1d1;
--destructive:#ef4444;
--destructive-foreground:#ffffff;
--radius:0.625rem;
--font-sans:"Inter",system-ui,sans-serif;
--font-heading:"Blockletter",sans-serif;
}

.dark{
--background:#0f0f0f;
--foreground:#f9f9f9;
--card:#1a1a1a;
--card-foreground:#f9f9f9;
--muted:#262626;
--muted-foreground:#a3a3a3;
--border:#2d2d2d;
--input:#2d2d2d;
--ring:#3a3a3a;
}

/* Layout - Essential only */
.max-w-7xl{max-width:80rem}
.mx-auto{margin-left:auto;margin-right:auto}
.px-4{padding-left:1rem;padding-right:1rem}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.px-8{padding-left:2rem;padding-right:2rem}

/* Flexbox - Essential only */
.flex{display:flex}
.flex-col{flex-direction:column}
.items-center{align-items:center}
.justify-center{justify-content:center}
.justify-between{justify-content:space-between}

/* Grid - Essential only */
.grid{display:grid}
.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}

/* Spacing - Essential only */
.space-y-4>:not([hidden])~:not([hidden]){margin-top:1rem}
.space-y-6>:not([hidden])~:not([hidden]){margin-top:1.5rem}
.gap-4{gap:1rem}
.gap-6{gap:1.5rem}

/* Colors - Essential only */
.bg-background{background-color:var(--background)}
.bg-primary{background-color:var(--primary)}
.bg-secondary{background-color:var(--secondary)}
.bg-accent{background-color:var(--accent)}
.bg-card{background-color:var(--card)}
.bg-muted{background-color:var(--muted)}
.text-foreground{color:var(--foreground)}
.text-primary{color:var(--primary)}
.text-primary-foreground{color:var(--primary-foreground)}
.text-secondary{color:var(--secondary)}
.text-secondary-foreground{color:var(--secondary-foreground)}
.text-accent{color:var(--accent)}
.text-accent-foreground{color:var(--accent-foreground)}
.text-muted-foreground{color:var(--muted-foreground)}
.border-border{border-color:var(--border)}

/* Typography - Essential only */
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading),sans-serif;font-weight:500;letter-spacing:0.05em;text-transform:uppercase}

/* Border radius - Essential only */
.rounded{border-radius:0.25rem}
.rounded-lg{border-radius:var(--radius)}
.rounded-xl{border-radius:calc(var(--radius) + 4px)}

/* Display - Essential only */
.hidden{display:none}
.block{display:block}

/* Animations - Essential only */
.animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}

/* Responsive - Essential breakpoints only */
@media (min-width:640px){
.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}
.sm\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
}

@media (min-width:768px){
.md\:px-8{padding-left:2rem;padding-right:2rem}
.md\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.md\:flex{display:flex}
.md\:hidden{display:none}
}

@media (min-width:1024px){
.lg\:px-12{padding-left:3rem;padding-right:3rem}
.lg\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
}

/* Font face - Essential only */
@font-face{
font-family:"Blockletter";
src:url("/fonts/Blockletter.otf") format("opentype");
font-weight:normal;
font-style:normal;
font-display:swap;
}`,
      }}
    />
  );
}

export const criticalStyles = `/* Critical CSS - Essential styles only */

/* CSS Reset - Minimal */
*,*::before,*::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--border)}
html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-sans),system-ui,sans-serif}
body{margin:0;line-height:inherit;background-color:var(--background);color:var(--foreground)}

/* CSS Variables - Essential only */
:root{
--primary:#6e29f6;
--primary-foreground:#ffffff;
--secondary:#f629a8;
--secondary-foreground:#ffffff;
--accent:#29f6d2;
--accent-foreground:#0f0f0f;
--background:#ffffff;
--foreground:#111111;
--card:#ffffff;
--card-foreground:#111111;
--muted:#f3f3f3;
--muted-foreground:#666666;
--border:#e5e5e5;
--input:#e5e5e5;
--ring:#d1d1d1;
--destructive:#ef4444;
--destructive-foreground:#ffffff;
--radius:0.625rem;
--font-sans:"Inter",system-ui,sans-serif;
--font-heading:"Blockletter",sans-serif;
}

.dark{
--background:#0f0f0f;
--foreground:#f9f9f9;
--card:#1a1a1a;
--card-foreground:#f9f9f9;
--muted:#262626;
--muted-foreground:#a3a3a3;
--border:#2d2d2d;
--input:#2d2d2d;
--ring:#3a3a3a;
}

/* Layout - Essential only */
.max-w-7xl{max-width:80rem}
.mx-auto{margin-left:auto;margin-right:auto}
.px-4{padding-left:1rem;padding-right:1rem}
.px-6{padding-left:1.5rem;padding-right:1.5rem}
.px-8{padding-left:2rem;padding-right:2rem}

/* Flexbox - Essential only */
.flex{display:flex}
.flex-col{flex-direction:column}
.items-center{align-items:center}
.justify-center{justify-content:center}
.justify-between{justify-content:space-between}

/* Grid - Essential only */
.grid{display:grid}
.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}

/* Spacing - Essential only */
.space-y-4>:not([hidden])~:not([hidden]){margin-top:1rem}
.space-y-6>:not([hidden])~:not([hidden]){margin-top:1.5rem}
.gap-4{gap:1rem}
.gap-6{gap:1.5rem}

/* Colors - Essential only */
.bg-background{background-color:var(--background)}
.bg-primary{background-color:var(--primary)}
.bg-secondary{background-color:var(--secondary)}
.bg-accent{background-color:var(--accent)}
.bg-card{background-color:var(--card)}
.bg-muted{background-color:var(--muted)}
.text-foreground{color:var(--foreground)}
.text-primary{color:var(--primary)}
.text-primary-foreground{color:var(--primary-foreground)}
.text-secondary{color:var(--secondary)}
.text-secondary-foreground{color:var(--secondary-foreground)}
.text-accent{color:var(--accent)}
.text-accent-foreground{color:var(--accent-foreground)}
.text-muted-foreground{color:var(--muted-foreground)}
.border-border{border-color:var(--border)}

/* Typography - Essential only */
h1,h2,h3,h4,h5,h6{font-family:var(--font-heading),sans-serif;font-weight:500;letter-spacing:0.05em;text-transform:uppercase}

/* Border radius - Essential only */
.rounded{border-radius:0.25rem}
.rounded-lg{border-radius:var(--radius)}
.rounded-xl{border-radius:calc(var(--radius) + 4px)}

/* Display - Essential only */
.hidden{display:none}
.block{display:block}

/* Animations - Essential only */
.animate-pulse{animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}

/* Responsive - Essential breakpoints only */
@media (min-width:640px){
.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}
.sm\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}
}

@media (min-width:768px){
.md\:px-8{padding-left:2rem;padding-right:2rem}
.md\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.md\:flex{display:flex}
.md\:hidden{display:none}
}

@media (min-width:1024px){
.lg\:px-12{padding-left:3rem;padding-right:3rem}
.lg\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
}

/* Font face - Essential only */
@font-face{
font-family:"Blockletter";
src:url("/fonts/Blockletter.otf") format("opentype");
font-weight:normal;
font-style:normal;
font-display:swap;
}`;