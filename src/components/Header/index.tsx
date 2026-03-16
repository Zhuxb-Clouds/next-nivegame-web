"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/image/飞雪logo.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const subLink = [
    { title: "桌游话说", enTitle: "HuaShuo", id: "/#HuaShuo" },
    { title: "关于我们", enTitle: "About us", id: "/#about" },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        href="/"
        aria-label="返回首页"
        onClick={() => setIsMenuOpen(false)}
      >
        <Image src={Logo} alt="FeiXueLogo" width={300} priority />
      </Link>

      {/* Mobile Menu Toggle Button */}
      <button
        className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="切换导航菜单"
        aria-expanded={isMenuOpen}
      >
        <span className={styles.hamburger}></span>
      </button>

      {/* Navigation Menu */}
      <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`} aria-label="主导航">
        {subLink.map((i, k) => {
          return (
            <Link key={k} className={styles.nav} href={i.id} onClick={() => setIsMenuOpen(false)}>
              <span>{i.title}</span>
              <span>{i.enTitle}</span>
            </Link>
          );
        })}
      </nav>

      {/* Overlay for mobile container */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}
    </header>
  );
}

export default Header;
