import { getAllNew } from "@/utils/news";
import NewsBox from "@/components/NewsBox";
export default async function Page() {
  const news = await getAllNew();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "20px",
        minHeight: "calc(100vh - 134px * 2)",
        padding: "40px 10% 10%",
      }}
    >
      {news.map((item, index) => (
        <NewsBox {...item} maxTextNumber={400} key="index"></NewsBox>
      ))}
    </div>
  );
}
