import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogPostCard from "@/components/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on machine learning, engineering, and building things.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <header className="mb-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary max-sm:text-3xl">
          Blog
        </h1>
        <p className="text-lg text-text-secondary">
          Thoughts on machine learning, engineering, and building things.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-text-tertiary">No posts yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              description={post.description}
            />
          ))}
        </div>
      )}
    </>
  );
}
