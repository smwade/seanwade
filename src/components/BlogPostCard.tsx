import Link from "next/link";

interface BlogPostCardProps {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export default function BlogPostCard({
  slug,
  title,
  date,
  description,
}: BlogPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block no-underline">
      <article className="rounded-xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:border-border-subtle-hover hover:bg-bg-card-hover">
        <h2 className="mb-2 text-lg font-semibold text-text-primary">
          {title}
        </h2>
        <time className="mb-2 block text-sm text-text-tertiary">{date}</time>
        <p className="text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      </article>
    </Link>
  );
}
