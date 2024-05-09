import * as React from "react";
import Header from "../components/Header";
import "./globals.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <head>
        <title>飞雪 - 武侠 | 桌游 | 话说 </title>
      </head>
      <body>
        <Header></Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
