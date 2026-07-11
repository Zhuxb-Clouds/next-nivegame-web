import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface StoryMeta {
  title: string;
  theme: string;
  order: number;
  summary: string;
}

const storiesDirectory = path.join(process.cwd(), "src/stories");
const fileNames = fs.existsSync(storiesDirectory)
  ? fs.readdirSync(storiesDirectory).filter((f) => f.endsWith(".md"))
  : [];

const storyMap = new Map(
  fileNames.map((fileName) => [getId(fileName), fileName])
);

export interface Story extends StoryMeta {
  id: string;
  content: string;
}

// 列表：读取所有短篇的元数据，按 order 排序
export function getAllStories(): Story[] {
  const stories = fileNames.map((fileName) => {
    const fullPath = path.join(storiesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id: getId(fileName),
      content: matterResult.content,
      ...(matterResult.data as StoryMeta),
    };
  });
  return stories.sort((a, b) => a.order - b.order);
}

// 单篇：按 id 读取内容
export async function getStoryData(id: string) {
  const name = decodeURI(id);
  const fileName = storyMap.get(name) || "";
  const fullPath = path.join(storiesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  return {
    id: name,
    content: matterResult.content,
    ...(matterResult.data as StoryMeta),
  };
}

function getId(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}
