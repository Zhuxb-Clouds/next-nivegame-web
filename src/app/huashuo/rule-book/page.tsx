import type { Metadata } from "next";
import Book3D from "./Book3D";

export const metadata: Metadata = {
  title: "图文规则书 | 话说",
  description: "《话说！》图文版规则书，3D 翻页阅读，完整还原实体说明。",
};

export default function Page() {
  return <Book3D />;
}
