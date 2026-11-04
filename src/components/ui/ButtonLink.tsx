import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "inverse";
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className,
  icon,
}: ButtonLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const opensNewTab = isExternal && /^https?:/.test(href);
  const classes = cn(
    variant === "primary" ? "button-primary" : variant === "inverse" ? "button-inverse" : "button-outline",
    className,
  );

  // Only links that leave the site get an icon, so the arrow means something.
  const trailing = icon ?? (opensNewTab ? <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" /> : null);

  const content = (
    <>
      <span>{children}</span>
      {trailing}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  );
}
