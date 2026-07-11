import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllStories, getStoryData } from "@/utils/stories";
import styles from "./story.module.css";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const story = await getStoryData(params.id);
  return {
    title: `${story.title} · 短篇 | 飞雪工作室`,
    description: story.summary,
  };
}

export default async function StoryPage({ params }: any) {
  const story = await getStoryData(params.id);
  return (
    <div className={styles.wrapper}>
      <a className={styles.back} href="/world">
        ← 返回短篇
      </a>
      <header className={styles.header}>
        <div className={styles.theme}>{story.theme}</div>
        <h1 className={styles.title}>{story.title}</h1>
      </header>
      <article className={styles.content}>
        <MDXRemote
          source={story.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
      <a className={styles.backBottom} href="/world">
        ← 返回短篇列表
      </a>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllStories().map((s) => ({ id: s.id }));
}
