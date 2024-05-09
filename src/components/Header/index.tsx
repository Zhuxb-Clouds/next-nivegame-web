import styles from "./Header.module.css";
import Image from "next/image";
import Logo from "@/assets/image/飞雪logo.png"



function Header() {
  const subLink = [
    { title: "最新动态", enTitle: "news", action: () => {} },
    { title: "桌游话说", enTitle: "HuaShuo", action: () => {} },
    { title: "关于我们", enTitle: "About us", action: () => {} },
  ];
  return (
    <div className={styles.header}>
      <a className={styles.logo} href="/">
        <Image src={Logo} alt="FeiXueLogo" width={300} />
      </a>
      <div className={styles.menu}>
        {subLink.map((i, k) => {
          return (
            <div key={k} className={styles.nav}>
              <span>{i.title}</span>
              <span>{i.enTitle}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Header;
