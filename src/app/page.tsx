import styles from "./page.module.css";
import { Image } from "antd";
import NImage from "next/image";
import NewsBox from "@/components/NewsBox";
import qq from "../assets/image/qq.png";
import wechat from "../assets/image/wechat.png";
import { getAllNew } from "@/utils/news";

const news = getAllNew().slice(0, 4);
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.firstScreen}>
        <div className={styles.xk}>
          <Image
            src="https://oss.hrsrive.cn/%E4%BE%A0%E5%AE%A2.png"
            alt="xk"
            id="xkImage"
            width={"100%"}
            height={"100%"}
            preview={false}
            style={{
              objectFit: "contain",
              objectPosition: "bottom",
            }}
          ></Image>
        </div>
        <section className={styles.introduce}>
          <div style={{
            maxHeight: "calc(100vh - 134px - 86px - 320px - 53px - 60px)",
          }}>
            <Image
              src="https://oss.hrsrive.cn/%E8%AF%9D%E8%AF%B4%E6%A8%AA%E5%90%91logo.png"
              alt="gameLogo"
              width={"100%"}
              height={"100%"}
              preview={false}
              className={styles.logo}
              style={{
                objectFit: "contain",
                objectPosition: "bottom",
              }}
            ></Image>
          </div>
          <h1>叙事类桌游</h1>
          <p>
            《话说！》是一款以<strong>武侠元素</strong>为内核，<strong>故事接龙</strong>
            为形式的原创卡牌游戏。它的玩法类似于故事接龙，多名玩家通过抽取卡片轮流进行故事讲述，期间需要完成一些特定情节获得结局，并将故事走向引导至自己的结局。
          </p>

          <a
            className={styles.btn}
            href="https://item.taobao.com/item.htm?abbucket=13&id=750584104149"
            target="_blank"
            rel="noopener noreferrer"
          >
            立刻获取
          </a>
        </section>
      </div>
      <div className={styles.news} id="news">
        <div className={styles.newsName}>
          <p>
            最新动态 <span>news</span>
          </p>
        </div>
        <div className={styles["news-boxes"]}>
          {news.map((item, index) => (
            <NewsBox {...item} key={index}></NewsBox>
          ))}
        </div>
        <a href="/new" className={styles.moreInfo} target="_blank" rel="noopener noreferrer">
          {"更多动态 ->"}
        </a>
      </div>
      <div className={styles.huashuo} id="HuaShuo">
        <div className={styles.logos}>
          <Image
            preview={false}
            width="400px"
            height="auto"
            alt=""
            src="https://oss.hrsrive.cn/%E8%AF%9D%E8%AF%B4logo%E9%80%8F%E6%98%8E.png"
          ></Image>
          <Image
            preview={false}
            alt=""
            width="400px"
            height="auto"
            src="https://oss.hrsrive.cn/%E8%AF%9D%E8%AF%B4%E6%A8%AA%E5%90%91logo.png"
          ></Image>
          <Image
            preview={false}
            width="400px"
            height="auto"
            alt=""
            src="https://oss.hrsrive.cn/%E5%84%BF%E5%A5%B3%E6%83%85%E9%95%BFlogo.png"
          ></Image>
        </div>
        <Image
          preview={false}
          className={styles.newBoxImage}
          width="50%"
          alt=""
          src="https://oss.hrsrive.cn/newBox.png"
        ></Image>
        <section>
          <p>
            可否记得老旧书本中字里行间中的<strong>侠骨柔情</strong>？
          </p>

          <p>
            无论是那高深莫测的<strong>武功绝学</strong>
            ，还是荧幕上光怪陆离的视觉奇观都曾给我们带来数不尽的感动——
          </p>

          <p>
            听过<strong>江湖夜雨</strong>，见证<strong>儿女情长</strong>
            ，为那些记忆中的故事有过热泪盈眶也有过怅然若失。
          </p>

          <p>
            我们希望能够以现实为载体，让那些有趣的故事不再只会停留在一个人的脑海里，而是在大家的思维碰撞下呈现出来耀眼的火花，玩家亦是主角亦是创造者。
          </p>
          <p>
            <a href="/huashuo" className={styles.moreInfo} rel="noopener noreferrer">
              {"更多信息 ->"}
            </a>
          </p>
        </section>
      </div>
      <div className={styles.contact} id="about">
        <div>
          <p>玩家社群</p>
          <div>
            <NImage src={qq} alt=""></NImage>
          </div>
        </div>
        <div>
          <p>联系我们</p>
          <div>
            <NImage src={wechat} alt=""></NImage>
          </div>
        </div>
      </div>
    </div>
  );
}
