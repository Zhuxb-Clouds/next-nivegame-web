import { Metadata } from "next";
import Table from "./table";
export const metadata: Metadata = {
  title: "话说 卡牌查询",
};
export default async function Page() {
  return (
    <>
      <Table />
    </>
  );
}
