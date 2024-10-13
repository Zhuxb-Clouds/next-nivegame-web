import Header from "../components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import "./globals.css";
import "./post.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
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
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Serif+SC:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header></Header>
        <main>
          <AntdRegistry>{children}</AntdRegistry>

          <SpeedInsights />
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
