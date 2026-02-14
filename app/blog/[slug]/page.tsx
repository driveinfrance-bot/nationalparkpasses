import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import Link from "next/link";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Drive in France`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <div className="section">
      <div className="container max-w-3xl space-y-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-blue-700">
            {post.publishedAt ?? "Draft"}
          </p>
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <p className="text-slate-600">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <article
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Link className="button" href="/apply">
            Apply now
          </Link>
          <Link
            className="rounded-full border border-slate-300 px-4 py-3 font-semibold text-slate-800"
            href="/blog"
          >
            Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}

