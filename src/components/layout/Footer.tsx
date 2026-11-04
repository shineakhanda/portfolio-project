import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { FOOTER_NAV } from "@/data/navigation";
import { SITE } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { StrataMark } from "@/components/layout/Header";

export function Footer() {
  return (
    <footer className="mt-8 bg-apricot text-ink">
      <div className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="display max-w-2xl text-[clamp(2.4rem,6vw,4.8rem)]">
              Got a website, a campaign or a server that needs attention?
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="button-primary">
                Tell me about it
              </Link>
              <a href={SITE.phone.href} className="button-outline hover:bg-butter">
                <Phone size={16} strokeWidth={1.8} aria-hidden="true" />
                Call {SITE.phone.display}
              </a>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-base leading-7 text-ink-soft">
              I usually reply within a day, in English or Bangla, whichever is easier for you.
            </p>
            <a
              href={SITE.email.href}
              className="link-underline mt-4 inline-flex items-center gap-2 break-all text-lg font-semibold"
            >
              <Mail size={17} strokeWidth={1.8} aria-hidden="true" />
              {SITE.email.display}
            </a>
          </div>
        </div>

        <div className="grid gap-10 rounded-[var(--radius-card)] bg-paper p-7 sm:grid-cols-2 md:p-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <StrataMark className="h-8 w-8 text-ink" />
              <span className="font-display text-xl font-bold tracking-[-0.03em]">Shine Akhanda</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Web developer, digital marketer and Linux admin in {SITE.location.display}. Founder of{" "}
              {SITE.company.name}.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <p className="text-sm font-bold">{group.title}</p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 text-sm text-ink-soft md:flex-row md:items-start md:justify-between">
          <p>© {SITE.currentYear} Shine Akhanda</p>
          <p className="max-w-2xl text-[0.8rem] leading-5 text-ink-soft md:text-right">
            Personal portfolio. Cave Technologies is a separate agency. Client screenshots are shown
            for reference and belong to their owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
