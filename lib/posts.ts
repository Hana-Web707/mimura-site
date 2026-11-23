import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

// 記事の一覧を取得する
export function getAllPosts(): PostMeta[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    };
  });

  // 新しい日付を上に並べる
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 1本の記事を取得して、HTMLと目次に変換する
export async function getPostBySlug(slug: string) {
  const raw = fs.readFileSync(path.join(postsDirectory, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const html = String(file);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    html,
        image: typeof data.image === "string" ? data.image : null,
    toc: extractToc(html),
  };
}

// HTMLの中から見出し(h2, h3)を探して、目次を作る
function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const pattern = /<h([23]) id="([^"]+)">([\s\S]*?)<\/h[23]>/g;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    items.push({
      level: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ""),
    });
  }
  return items;
}