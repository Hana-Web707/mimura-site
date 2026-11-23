import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-bold text-orange-700">
          三村花子の学習記録
        </Link>
        <span className="text-sm text-stone-600">Next.js × AI</span>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-16">
        <section className="rounded-3xl bg-orange-100 px-6 py-12 sm:px-12 sm:py-16">
          <p className="text-sm font-semibold text-orange-700">
            初心者×AIの勉強記録
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-snug text-stone-900 sm:text-4xl">
            Next.js入門、何から始めればいい？
          </h1>
          <p className="mt-4 max-w-xl text-stone-700">
            何を勉強すればいいかわからない初心者の私が、AIに質問しながら進めた、はじめの一歩の記録です。質問の仕方、つまずいた点、用語メモも紹介しています。同じ悩みの方の参考になれば嬉しいです。
          </p>
          <a
            href="#posts"
            className="mt-8 inline-block rounded-full bg-orange-700 px-6 py-3 font-semibold text-white transition hover:bg-orange-800"
          >
            記事を読む
          </a>
        </section>

        <section id="posts" className="mt-14">
          <h2 className="text-2xl font-bold text-stone-900">記事一覧</h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="text-sm text-stone-600">{post.date}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-stone-900">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-orange-100 py-8 text-center text-sm text-stone-600">
        © 2026 三村花子
      </footer>
    </div>
  );
}