import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { BrowserFrame } from "@/components/projects/BrowserFrame";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

const PANEL_COLORS = ["bg-sky", "bg-butter", "bg-apricot"] as const;

type BookPageProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animate: boolean;
};

function BookPage({ project, index, total, progress, animate }: BookPageProps) {
  const isLast = index === total - 1;
  const segment = 1 / total;
  const start = segment * (index + 1) - segment * 0.34;
  const end = segment * (index + 1);
  const transformStart = isLast ? 0 : start;
  const transformEnd = isLast ? 1 : end;

  const rotateX = useTransform(progress, [transformStart, transformEnd], [0, isLast ? 0 : 4.5]);
  const rotateY = useTransform(
    progress,
    [transformStart, transformEnd],
    [0, isLast ? 0 : index % 2 === 0 ? -3.2 : 3.2],
  );
  const scale = useTransform(progress, [transformStart, transformEnd], [1, isLast ? 1 : 0.94]);
  const y = useTransform(progress, [transformStart, transformEnd], [0, isLast ? 0 : -26]);
  const opacity = useTransform(progress, [transformStart, transformEnd], [1, isLast ? 1 : 0.42]);

  const imageFirst = index % 2 === 1;
  const panelColor = PANEL_COLORS[index % PANEL_COLORS.length];

  return (
    <div
      id={`project-page-${project.slug}`}
      className="project-book-card relative z-[var(--page-z)] mb-12 lg:sticky lg:top-[100px] lg:mb-[20vh]"
      style={{ "--page-z": index + 1 } as React.CSSProperties}
    >
      <motion.article
        className="book-page overflow-hidden"
        style={animate ? { rotateX, rotateY, scale, y, opacity } : undefined}
        aria-labelledby={`project-title-${project.slug}`}
      >
        <div className="book-page-inner grid h-full min-h-[600px] lg:min-h-0 lg:grid-cols-12">
          <div
            className={cn(
              "relative flex flex-col p-5 sm:p-7 md:p-8 lg:col-span-5 lg:p-9",
              panelColor,
              imageFirst ? "lg:order-2" : "lg:order-1",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-semibold text-ink-soft">
                {index + 1} of {total}
              </p>
              <p className="chip bg-paper/70">{project.category}</p>
            </div>

            <div className="my-auto py-9 lg:py-6">
              <h2
                id={`project-title-${project.slug}`}
                className="font-display text-[clamp(2.8rem,5.4vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
              >
                {project.title}
              </h2>
              <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-ink-soft">{project.summary}</p>

              <ul className="mt-5 space-y-1.5 text-sm text-ink-soft" aria-label="Highlights">
                {project.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Verified technologies">
                {project.stack.map((technology) => (
                  <li key={technology} className="chip bg-paper/70">
                    {technology}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                <Link
                  to={`/projects/${project.slug}`}
                  className="button-primary"
                >
                  Read case study
                </Link>
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-outline hover:bg-paper"
                >
                  Visit live site <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-ink/15 pt-3">
              <span className="text-[0.82rem] font-semibold text-ink-soft">
                {project.projectType}
              </span>
              <span className="flex items-center gap-2 text-[0.82rem] text-ink-soft">
                {isLast ? "End of selection" : "Continue"}
                {isLast ? null : <ArrowDown size={12} strokeWidth={1.5} aria-hidden="true" />}
              </span>
            </div>
          </div>

          <figure
            className={cn(
              "relative flex min-h-[18rem] border-ink lg:col-span-7 lg:min-h-0",
              imageFirst
                ? "order-first border-b-[1.5px] lg:order-1 lg:border-b-0 lg:border-r-[1.5px]"
                : "border-t-[1.5px] lg:order-2 lg:border-l-[1.5px] lg:border-t-0",
            )}
          >
            <BrowserFrame url={project.externalUrl} variant="flush" className="w-full">
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover object-top lg:absolute lg:inset-0"
              />
            </BrowserFrame>
            <figcaption className="sr-only">
              {project.title}, {project.projectType}
            </figcaption>
          </figure>
        </div>
      </motion.article>
    </div>
  );
}

export function ProjectBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <noscript>
        <style>{`.project-book-card{position:static !important;margin-bottom:2rem !important;}`}</style>
      </noscript>
      <div className="relative" style={{ perspective: "1800px" }} ref={containerRef}>
        {PROJECTS.map((project, index) => (
          <BookPage
            key={project.slug}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
            animate={isDesktop && !reduceMotion}
          />
        ))}
      </div>
    </>
  );
}
