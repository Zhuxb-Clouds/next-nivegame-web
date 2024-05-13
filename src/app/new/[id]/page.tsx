// import type { GetStaticProps, GetStaticPaths } from "next";

import { getNewsData } from "@/utils/news";

import Date from "@/components/date";
// 引入代码高亮css
import { MDXRemote } from "next-mdx-remote/rsc";
import style from "./new.module.css";
export const metadata = {
  title: ""
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const newData = await getNewsData(id);
  metadata.title = newData.title;
  return (
    <div className="new">
      <h1 className={style.title}>{newData.title}</h1>
      <div className={style.tags}></div>
      <Date dateString={newData.date} className={style.time} />

      <article className={style.content}>
        <MDXRemote source={newData.content} />
      </article>
    </div>
  );
}
