import { useLocation, useParams, Link } from "react-router-dom";
import { BLOG_CATEGORIES, getCategoryBySlug } from "@/data/blogTaxonomy";
import { getPostsByCategory, getPostsByTag, getTagArchives } from "@/lib/blogMeta";
import { BlogCard } from "@/components/ui/BlogCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NotFound } from "@/pages/NotFound";

export function BlogArchive() {
  const { slug = "" } = useParams();
  const { pathname } = useLocation();
  const isTagArchive = pathname.startsWith("/blog/tags/");

  const category = !isTagArchive ? getCategoryBySlug(slug) : undefined;
  const tagArchive = isTagArchive ? getTagArchives().find((tag) => tag.slug === slug) : undefined;
  const posts = category ? getPostsByCategory(category.slug) : tagArchive ? getPostsByTag(tagArchive.slug) : [];

  if ((!category && !tagArchive) || posts.length === 0) {
    return <NotFound />;
  }

  const name = category?.name ?? tagArchive?.tag ?? "Archive";
  const description =
    category?.description ??
    `Articles tagged “${tagArchive?.tag}” across web development, marketing, and infrastructure.`;

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/blog" },
            { label: name },
          ]}
        />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow={isTagArchive ? "Journal tag" : "Journal topic"}
          title={
            <>
              {name}
            </>
          }
          intro={<p>{description}</p>}
          meta={
            <div className="rounded-[var(--radius-card)] border-[1.5px] border-ink bg-sky p-6">
              <p className="eyebrow text-muted">In this archive</p>
              <p className="mt-4 font-display text-4xl font-semibold">{posts.length}</p>
              <p className="mt-1 text-xs text-muted">
                {posts.length === 1 ? "article" : "articles"}
              </p>
              <ButtonLink href="/blog" variant="outline" className="mt-5">
                All articles
              </ButtonLink>
            </div>
          }
        />
      </div>

      <section className="container-editorial py-12 md:py-16">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} priority={index < 3} />
          ))}
        </div>
      </section>

      <section className="bg-paper-deep py-12">
        <div className="container-editorial">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-muted">{isTagArchive ? "All tags" : "All categories"}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:col-span-9">
              {isTagArchive
                ? getTagArchives().map((tag) => (
                    <Link
                      key={tag.slug}
                      to={`/blog/tags/${tag.slug}`}
                      className={`rounded-full border px-3 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                        tag.slug === slug
                          ? "border-ink bg-butter text-ink"
                          : "border-line text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      {tag.tag}
                    </Link>
                  ))
                : BLOG_CATEGORIES.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/blog/categories/${item.slug}`}
                      className={`rounded-full border px-3 py-1.5 text-[0.82rem] font-semibold transition-colors ${
                        item.slug === slug
                          ? "border-ink bg-butter text-ink"
                          : "border-line text-muted hover:border-ink hover:text-ink"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
