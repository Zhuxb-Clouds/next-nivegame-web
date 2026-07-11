/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  images: { unoptimized: true },
  // 关闭并行构建 worker，规避 Next 14.2 静态导出偶发的
  // "Failed to collect page data" worker 竞态
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
