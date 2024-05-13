'use client';
import styles from "./Header.module.css";
import Image from "next/image";
import Logo from "@/assets/image/飞雪logo.png"

function Header() {
  const subLink = [
    { title: "最新动态", enTitle: "news", id: "news" },
    { title: "桌游话说", enTitle: "HuaShuo",  id: "HuaShuo" },
    { title: "关于我们", enTitle: "About us",  id: "about" },
  ];
  const handleClick = (id:string) => {
    const element = document.getElementById(id);
    if(element){
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">
        <Image src={Logo} alt="FeiXueLogo" width={300} />
      </a>
      <div className={styles.menu}>
        {subLink.map((i, k) => {
          return (
            <div key={k} className={styles.nav} onClick={()=>{
              handleClick(i.id)
            }}>
              <span>{i.title}</span>
              <span>{i.enTitle}</span>
            </div>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
