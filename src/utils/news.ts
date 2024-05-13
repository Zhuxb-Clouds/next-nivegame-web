// pages/api/news.js
import fs from 'fs';
import path from 'path';
// gray-matter：获取元数据
import matter from 'gray-matter';
import { parseISO } from "date-fns";
interface MatterMark {
  data: { date: string; title: string; };
  content: string;
  [key: string]: unknown;
}

const newsDirectory = path.join(process.cwd(), 'src/news');
const fileNames = fs.readdirSync(newsDirectory);
const newsMap = new Map(
  fileNames.map((fileName) => {
    const id = getUuid(fileName);
    return [id, fileName];
  })
);



export function getAllNew(): Array<{
  id: string;
  date: string;
  title: string;
  content: string;
}> {
  // 获取所有md文件用于展示首页列表的数据，包含id，元数据（标题，时间）
  const allNewsData = fileNames.map((fileName) => {
    // 将fileName从转码为中文

    // 去除文件名的md后缀，使其作为文章id使用
    const id = getUuid(fileName);

    // 获取md文件路径
    const fullPath = path.join(newsDirectory, fileName);

    // 读取md文件内容
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // 使用matter提取md文件元数据：{data:{//元数据},content:'内容'}
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as MatterMark["data"]),
      content: matterResult.content.match(/[\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/g)?.join("") || ""
    };
  });

  // 按照日期从进到远排序
  return allNewsData.sort((a, b) => {
    return parseISO(a.date) < parseISO(b.date) ? 1 : -1;
  });
}

// function getPinYin(str: string) {
//   const name = str.replace(/\.md$/, "");
//   const id = pinyin(name, {
//     style: "normal",
//     heteronym: false,
//   }).join("-")
//   console.log('id',id)
//   return id;
// }

// 获取指定文章内容
export async function getNewsData(id: string) {
  const name = decodeURI(id);
  const fileName = newsMap.get(name) || "";
  const fullPath = path.join(newsDirectory, fileName);

  // 读取文章内容
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // 使用matter解析markdown元数据和内容
  const matterResult = matter(fileContents);

  return {
    content: matterResult.content,
    ...(matterResult.data as MatterMark["data"]),
  };
}


export function getUuid(fileName: string): string {
  const name = fileName.replace(/\.md$/, "");
  return name;
}
