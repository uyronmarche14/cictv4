'use client';

import { Zap, Cpu, Fingerprint, Pencil } from 'lucide-react';

const items = [
  {
    icon: <Zap className="size-5" />,
    title: 'Faaast',
    short: 'Lightning-quick sitemap generation without the wait.',
    long: 'Generate full project blueprints in seconds, powered by cutting-edge AI.',
    img: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&w=800&q=60',
  },
  {
    icon: <Cpu className="size-5" />,
    title: 'Powerful',
    short: 'Handles complex architectures with intelligent AI.',
    long: 'From tiny blogs to enterprise portals, our engine scales effortlessly.',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=60',
  },
  {
    icon: <Fingerprint className="size-5" />,
    title: 'Security',
    short: 'Enterprise-grade security baked into every step.',
    long: 'SOC-2 compliant, encrypted end-to-end, and audited regularly.',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=60',
  },
  {
    icon: <Pencil className="size-5" />,
    title: 'Customization',
    short: 'Tailor every detail to fit your brand and workflow.',
    long: 'White-label, custom CSS, flexible APIs—your design, your rules.',
    img: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=60',
  },
];

export default function Tabs3() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col rounded-xl border border-border/20 bg-muted/5 hover:bg-muted/10 transition-all duration-300 overflow-hidden"
        >
          {/* Image container */}
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={item.img}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="flex flex-col p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              {item.icon}
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.short}</p>
            <p className="text-xs text-muted-foreground/80 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.long}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}