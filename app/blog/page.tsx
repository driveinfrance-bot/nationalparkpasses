import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Drive in France",
  description: "Guides about Crit’Air, low-emission zones, and driving in France.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="section">
      <div className="container space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="badge">Blog</p>
            <h1 className="mt-3 text-4xl font-semibold">
              Driving in France: guides and updates
            </h1>
            <p className="text-slate-600">
              Learn about Crit’Air rules, low-emission zones, and visitor tips.
            </p>
          </div>
          <Link className="button" href="/apply">
            Apply now
          </Link>
        </div>
        <div className="grid grid-2 gap-4">
          {posts.map((post) => (
            <article key={post.slug} className="card p-5">
              <p className="text-xs uppercase tracking-wide text-[#1F3A2E]">
                {post.publishedAt ?? "Draft"}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-2 text-slate-600">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                className="mt-4 inline-flex font-semibold text-[#1F3A2E]"
                href={`/blog/${post.slug}`}
              >
                Read post →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

