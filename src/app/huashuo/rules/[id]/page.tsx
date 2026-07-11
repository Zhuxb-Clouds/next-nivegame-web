import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { getAllRules, getRuleData } from "@/utils/rules";
import styles from "./rulebook.module.css";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const rule = await getRuleData(params.id);
  return {
    title: `${rule.title} · 规则 | 话说`,
    description: rule.summary,
  };
}

export default async function RulePage({ params }: any) {
  const rule = await getRuleData(params.id);
  return (
    <div className={styles.wrapper}>
      <a className={styles.back} href="/huashuo">
        ← 返回玩家专区
      </a>
      <header className={styles.header}>
        <div className={styles.pack}>{rule.pack}</div>
        <h1 className={styles.title}>{rule.title}</h1>
      </header>
      <article className={styles.content}>
        <MDXRemote
          source={rule.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm, remarkBreaks] } }}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllRules().map((r) => ({ id: r.id }));
}
