import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  content: string;
  publishedAt?: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    if (!fs.existsSync(BLOG_DIR)) return [];
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
    const posts: BlogPost[] = [];

    for (const file of files) {
      try {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(BLOG_DIR, file);
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        const processed = await remark().use(html).process(content);
        posts.push({
          slug,
          title: data.title ?? slug,
          excerpt: data.excerpt ?? "",
          tags: data.tags ?? [],
          publishedAt: data.publishedAt ?? null,
          content: processed.toString(),
        });
      } catch (error) {
        console.error(`Error processing blog post ${file}:`, error);
      }
    }

    return posts.sort((a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
    );
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      console.warn(`Blog post not found: ${slug}.mdx`);
      return null;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const processed = await remark().use(html).process(content);
    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
      publishedAt: data.publishedAt ?? null,
      content: processed.toString(),
    };
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error);
    return null;
  }
}

