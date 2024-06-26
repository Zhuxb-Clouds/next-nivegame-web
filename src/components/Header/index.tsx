"use client";
import styles from "./Header.module.css";
import Image from "next/image";
import Logo from "@/assets/image/飞雪logo.png";

function Header() {
  const subLink = [
    { title: "最新动态", enTitle: "news", id: "/#news" },
    { title: "桌游话说", enTitle: "HuaShuo", id: "/#HuaShuo" },
    { title: "关于我们", enTitle: "About us", id: "/#about" },
  ];
  return (
    <header className={styles.header}>
      <a
        className={styles.logo}
        href="/"
      >
        <Image src={Logo} alt="FeiXueLogo" width={300} />
      </a>
      <div className={styles.menu}>
        {subLink.map((i, k) => {
          return (
            <a
              key={k}
              className={styles.nav}
              href={i.id}
            >
              <span>{i.title}</span>
              <span>{i.enTitle}</span>
            </a>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
