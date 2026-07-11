import styles from "./Footer.module.css";
import { links, channels } from "@/config/links";

const navLinks = [
  { title: "关于我们", href: "/about" },
  { title: "江湖短篇", href: "/world" },
  { title: "玩家专区", href: "/huashuo" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.brandName}>飞雪工作室</div>
          <p className={styles.slogan}>江湖、故事和武侠梦</p>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h4>在哪买 · 关注</h4>
            {channels.map((c) => (
              <a
                key={c.key}
                href={links[c.key]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.label}
                <span>{c.desc}</span>
              </a>
            ))}
          </div>

          <div className={styles.col}>
            <h4>逛逛</h4>
            {navLinks.map((n) => (
              <a key={n.href} href={n.href}>
                {n.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2024 飞雪 - 武侠 | 桌游 | 话说</p>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">
          鄂ICP备2022011304号-1
        </a>
      </div>
    </footer>
  );
}
