import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Kept for compatibility; numbering is no longer displayed. */
  index?: string;
  /** Kept for compatibility; small labels above headings are no longer displayed. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { label: string; href: string };
  className?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  title,
  description,
  link,
  className,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <h2
          className={cn(
            "display text-[clamp(2.1rem,4.6vw,3.8rem)]",
            tone === "dark" ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-xl text-base leading-7",
              tone === "dark" ? "text-paper/70" : "text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {link ? (
        <div className="md:col-span-4 md:flex md:justify-end">
          <Link
            to={link.href}
            className={cn(
              "link-underline text-sm font-semibold",
              tone === "dark" ? "text-paper" : "text-ink",
            )}
          >
            {link.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
