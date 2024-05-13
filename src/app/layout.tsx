import Header from "../components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import "./globals.css";
import "./post.css";

type LayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: "飞雪 - 武侠 | 桌游 | 话说"
}

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
