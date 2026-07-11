import type { Metadata } from "next";
import styles from "./world.module.css";
import { getAllStories } from "@/utils/stories";

export const metadata: Metadata = {
  title: "江湖 · 短篇 | 飞雪工作室",
  description:
    "《话说！》不止一盒游戏，而是一个江湖。四篇武侠原创短篇，从喜剧到悲歌，走进这个由我们与你共同书写的世界。",
};

const stories = getAllStories();

export default function WorldPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroTitle}>
          <h1>走进这个江湖</h1>
          <span>Stories</span>
        </div>
        <p className={styles.heroLede}>
          《话说！》不止一盒游戏，而是一个江湖。这里是我们写下的武侠原创短篇——
          有热汤面香气里的论剑，有走向覆灭的大侠，也有对天下大义的叩问。
          它们与牌桌上的故事共享同一片天地，也等着与你笔下的江湖相遇。
        </p>
      </header>

      <div className={styles.storyList}>
        {stories.map((s) => (
          <a className={styles.storyCard} href={`/world/${s.id}`} key={s.id}>
            <div className={styles.storyTheme}>{s.theme}</div>
            <h2 className={styles.storyTitle}>{s.title}</h2>
            <p className={styles.storySummary}>{s.summary}</p>
            <span className={styles.storyMore}>阅读全文 →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
