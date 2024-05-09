import styles from "./page.module.css";
import { Image } from "antd";
import NImage from "next/image";
import qq from "../assets/image/qq.png";
import wechat from "../assets/image/wechat.png";

const news = new Array(4).fill({
  title: "《话说！》桌游正式发售",
  content: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  time: "2021-07-01",
});
export default function Home() {
  return (
    <div className="container">
      <div className={styles.firstScreen}>
        <Image
          width="50vw"
          src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/%E4%BE%A0%E5%AE%A2.png"
          preview={false}
          alt="xk"
          className={styles.xk}
        ></Image>
        <section className={styles.introduce}>
          <Image
            src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/%E8%AF%9D%E8%AF%B4%E6%A8%AA%E5%90%91logo.png"
            alt="gameLogo"
            width={700}
            preview={false}
            className={styles.logo}
          ></Image>
          <h1>叙事类桌游</h1>
          <p>
            《话说！》是一款以<strong>武侠元素</strong>为内核，<strong>故事接龙</strong>
            为形式的原创卡牌游戏。它的玩法类似于故事接龙，多名玩家通过抽取卡片轮流进行故事讲述，期间需要完成一些特定情节获得结局，并将故事走向引导至自己的结局。
          </p>

          <button className={styles.btn}>
            <a
              href="https://item.taobao.com/item.htm?abbucket=13&id=750584104149"
              target="_blank"
              rel="noopener noreferrer"
            >
              立刻获取
            </a>
          </button>
        </section>
      </div>
      <div className={styles.news}>
        <div className={styles.newsName}>
          <p>
            最新动态 <span>news</span>
          </p>
        </div>
        <div className={styles["news-boxes"]}>
          {news.map((item, index) => (
            <div className={styles["news-box"]} key={index}>
              <p className={styles["news-title"]}>{item.title}</p>
              <p className={styles["news-content"]}>{item.content}</p>
              <p className={styles["news-time"]}>{item.time}</p>
            </div>
          ))}
        </div>
        <a href="" className={styles.moreInfo} target="_blank" rel="noopener noreferrer">
          {"更多动态 ->"}
        </a>
      </div>
      <div className={styles.huashuo}>
        <div className={styles.logos}>
          <Image
            preview={false}
            height="200px"
            alt=""
            src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/%E8%AF%9D%E8%AF%B4logo%E9%80%8F%E6%98%8E.png"
          ></Image>
          <Image
            preview={false}
            alt=""
            height="200px"
            src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/%E8%AF%9D%E8%AF%B4%E6%A8%AA%E5%90%91logo.png"
          ></Image>
          <Image
            preview={false}
            height="200px"
            alt=""
            src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/%E5%84%BF%E5%A5%B3%E6%83%85%E9%95%BFlogo.png"
          ></Image>
        </div>
        <Image
          preview={false}
          style={{ left: "-80px", position: "relative" }}
          height="700px"
          alt=""
          src="https://zhuxb-oss.oss-cn-hangzhou.aliyuncs.com/newBox.png"
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
        </section>
      </div>
      <div className={styles.contact}>
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
