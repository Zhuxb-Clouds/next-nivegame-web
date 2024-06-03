import style from "./page.module.css";
import { Image } from "antd";
export const metadata = {
  title: "话说 在线规则书",
};
export default async function Page() {
  const imageUrl = "https://huashuo-oss.oss-cn-beijing.aliyuncs.com/rule-book/";
  const imgList = [
    "P1.png",
    "P2.png",
    "P3.png",
    "P4.png",
    "P5.png",
    "P6.png",
    "P7.png",
    "P8.png",
    "P9.png",
    "P10.png",
    "P11.png",
    "P12.png",
    "SP0.png",
    "SP1.png",
    "SP2.png",
    "SP3.png",
  ];
  return (
    <>
      <div className={style.container}>
        {imgList.map((item, index) => (
          <div key={index} className={style.item}>
            <Image src={imageUrl + item} alt={item} />
          </div>
        ))}
      </div>
    </>
  );
}
