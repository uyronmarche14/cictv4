'use client';
import Image from "next/image"
import { renderIcon } from "@/app/lib/utils/icon-mapper";
import { storyTabsData } from "@/app/lib/data/static/story-tabs";

export default function Tabs3() {
  const items = storyTabsData.tab3.items;
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col rounded-xl border border-border/20 bg-muted/5 hover:bg-muted/10 transition-all duration-300 overflow-hidden"
        >
          {/* Image container */}
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={item.img}
              alt={item.title}
              width={800}
              height={450}
              className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-b  lack/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="flex flex-col p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              {renderIcon(item.icon, { className: "size-5" })}
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