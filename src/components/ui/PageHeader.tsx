import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: ReactNode;
  aside?: ReactNode;
};

export function PageHeader({ eyebrow, title, intro, meta, aside }: PageHeaderProps) {
  return (
    <header className="pb-12 pt-12 md:pb-16 md:pt-20">
      <p className="text-sm font-semibold text-muted">{eyebrow}</p>
      <div className="mt-5 grid gap-10 md:grid-cols-12 md:items-end">
        <div className={meta || aside ? "md:col-span-8" : "md:col-span-10"}>
          <h1 className="display max-w-4xl text-[clamp(2.8rem,7vw,6.2rem)]">{title}</h1>
          {intro ? (
            <div className="mt-6 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
              {intro}
            </div>
          ) : null}
        </div>
        {meta || aside ? (
          <div className="md:col-span-4">
            {meta}
            {aside}
          </div>
        ) : null}
      </div>
    </header>
  );
}
