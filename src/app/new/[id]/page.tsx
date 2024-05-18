// import type { GetStaticProps, GetStaticPaths } from "next";

import { getAllNew, getNewsData } from "@/utils/news";
import Date from "@/components/date";
// 引入代码高亮css
import { MDXRemote } from "next-mdx-remote/rsc";
import style from "./new.module.css";
export const metadata = {
  title: "",
};

export default async function Page({ params }: any) {
  const newData = await getNewsData(params.id);
  metadata.title = `${newData.title} - 飞雪 - 武侠 | 桌游 | 话说`;
  return (
    <div className="new">
      <h1 className={style.title}>{newData.title}</h1>
      <Date dateString={newData.date} className={style.time} />
      <article className={style.content}>
        <MDXRemote source={newData.content} />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const newData = await getAllNew();
  return newData;
}
