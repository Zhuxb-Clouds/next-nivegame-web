import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "玩家专区 | 话说",
  description:
    "《话说！》玩家专区：规则中心、图文规则书、卡牌查询与江湖短篇，已入江湖的你需要的都在这里。",
};

const entries = [
  {
    href: "/huashuo/rules/guizeshu",
    title: "完整规则书",
    en: "Rules",
    desc: "完整规则书文本版，可搜索、可查阅：卡牌介绍、标准模式、双人模式与幽镜志怪玩法。",
  },
  {
    href: "/huashuo/rule-book",
    title: "图文规则书",
    en: "Rulebook",
    desc: "排版精美的图文版规则书，完整还原实体说明。",
  },
  {
    href: "/huashuo/card-comp",
    title: "卡牌查询",
    en: "Cards",
    desc: "按包与类型检索卡牌，查看卡面与文本，丢牌也能随时对照。",
  },
  {
    href: "/world",
    title: "江湖短篇",
    en: "Stories",
    desc: "武侠原创短篇，从喜剧到悲歌，与牌桌上的江湖同处一片天地。",
  },
];

export default function Page() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headTitle}>
          <h1>玩家专区</h1>
          <span>For Players</span>
        </div>
        <p className={styles.lede}>已入江湖？规则、卡牌与故事，你需要的都在这里。</p>
      </header>

      <div className={styles.grid}>
        {entries.map((e) => (
          <a className={styles.card} href={e.href} key={e.href}>
            <div className={styles.cardEn}>{e.en}</div>
            <h2 className={styles.cardTitle}>{e.title}</h2>
            <p className={styles.cardDesc}>{e.desc}</p>
            <span className={styles.cardMore}>进入 →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
