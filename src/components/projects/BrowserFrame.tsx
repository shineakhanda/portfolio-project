import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  /** The live site's address, shown in the frame's address bar. */
  url: string;
  children: ReactNode;
  className?: string;
  /** Use "flush" when the frame sits inside another bordered surface. */
  variant?: "card" | "flush";
};

export function displayHost(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** A light browser window around a website screenshot. */
export function BrowserFrame({ url, children, className, variant = "card" }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden bg-paper",
        variant === "card" && "rounded-[var(--radius-card)] border-[1.5px] border-ink",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b-[1.5px] border-ink bg-paper px-4 py-2.5">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-ink bg-apricot" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink bg-butter" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink bg-sky" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-paper-deep px-3 py-1 text-[0.78rem] font-semibold text-muted">
          {displayHost(url)}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-paper-deep">{children}</div>
    </div>
  );
}
