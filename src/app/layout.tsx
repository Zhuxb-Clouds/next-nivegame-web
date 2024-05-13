import Header from "../components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import "./globals.css";
import "./post.css";
import type { Metadata } from "next";
type LayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "飞雪 - 武侠 | 桌游 | 话说",
  icons: "/icon.png",
  authors: { name: "朱仙变", url: "https://zhuxb.dev/" },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
