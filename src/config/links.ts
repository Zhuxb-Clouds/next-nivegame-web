// 飞雪工作室 · 全渠道外链统一配置
//
// 填好后首页 CTA、页脚、联系页会自动使用。

export const links = {
  // 电商 / 成交
  // 淘宝已下架，暂时停用（恢复时取消相关注释即可）
  taobao: "https://item.taobao.com/item.htm?abbucket=13&id=750584104149",

  // 社媒 / 内容（主要引流渠道）
  xiaohongshu:
    "https://www.xiaohongshu.com/user/profile/692c5b2a0000000037029927",
  bilibili: "https://space.bilibili.com/80935711",
} as const;

// 渠道展示元信息（用于页脚 / 联系页统一渲染）
export const channels: Array<{
  key: keyof typeof links;
  label: string;
  desc: string;
}> = [
  // 淘宝已下架，暂时从展示渠道移除
  // { key: "taobao", label: "淘宝", desc: "想买 → 这里" },
  { key: "xiaohongshu", label: "小红书", desc: "追更 · 种草" },
  { key: "bilibili", label: "B站", desc: "教程 · 实况" },
];
