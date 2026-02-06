import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-text-primary max-sm:text-3xl">
          {post.title}
        </h1>
        <time className="text-sm text-text-tertiary">{post.date}</time>
      </header>
      <div className="text-text-secondary leading-[1.8] [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-text-primary [&_p]:mb-4 [&_a]:text-accent [&_a]:no-underline hover:[&_a]:text-white [&_strong]:text-text-primary [&_code]:text-accent">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
