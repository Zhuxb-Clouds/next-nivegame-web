import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface RuleMeta {
  title: string;
  pack: string;
  order: number;
  summary: string;
}

const rulesDirectory = path.join(process.cwd(), "src/rules");
const fileNames = fs.existsSync(rulesDirectory)
  ? fs.readdirSync(rulesDirectory).filter((f) => f.endsWith(".md"))
  : [];

const ruleMap = new Map(fileNames.map((fileName) => [getId(fileName), fileName]));

export interface Rule extends RuleMeta {
  id: string;
  content: string;
}

export function getAllRules(): Rule[] {
  const rules = fileNames.map((fileName) => {
    const fullPath = path.join(rulesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id: getId(fileName),
      content: matterResult.content,
      ...(matterResult.data as RuleMeta),
    };
  });
  return rules.sort((a, b) => a.order - b.order);
}

export async function getRuleData(id: string) {
  const name = decodeURI(id);
  const fileName = ruleMap.get(name) || "";
  const fullPath = path.join(rulesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  return {
    id: name,
    content: matterResult.content,
    ...(matterResult.data as RuleMeta),
  };
}

function getId(fileName: string): string {
  return fileName.replace(/\.md$/, "");
}
