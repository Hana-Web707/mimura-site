import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

// ビルドのときに、すべての記事のページをあらかじめ作る
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// 検索結果に出るタイトルなどを、記事ごとに決める
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllPosts().map((post) => post.slug);
  if (!slugs.includes(slug)) return {};
  const post = await getPostBySlug(slug);
  return {
    title: `${post.title} | 三村花子の学習記録`,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const slugs = getAllPosts().map((post) => post.slug);
  if (!slugs.includes(slug)) notFound();

  const post = await getPostBySlug(slug);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-bold text-orange-700">
          三村花子の学習記録
        </Link>
        <span className="text-sm text-stone-600">Next.js × AI</span>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16">
        <Link
          href="/"
          className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-800 transition hover:bg-orange-200"
        >
          ← 記事一覧へ戻る
        </Link>

        <article className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-stone-600">{post.date}</p>
              <h1 className="mt-2 text-2xl font-bold leading-snug text-stone-900 sm:text-3xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {post.image && (
              <Image
                src={post.image}
                alt="プロフィール写真"
                width={112}
                height={112}
                className="h-20 w-20 shrink-0 rounded-full border-4 border-orange-200 object-cover sm:h-28 sm:w-28"
              />
            )}
          </div>

          {post.toc.length > 0 && (
            <nav className="mt-8 rounded-2xl bg-orange-50 p-5">
              <p className="font-bold text-stone-900">目次</p>
              <ul className="mt-3 space-y-2 text-sm">
                {post.toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="text-orange-800 hover:underline"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div
            className="article mt-8"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-full bg-orange-700 px-6 py-3 font-semibold text-white transition hover:bg-orange-800"
          >
            ほかの記事を読む
          </Link>
        </div>
      </main>

      <footer className="border-t border-orange-100 py-8 text-center text-sm text-stone-600">
        © 2026 三村花子
      </footer>
    </div>
  );
}