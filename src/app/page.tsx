import styles from "./page.module.css";
import { Image } from "antd";
import NImage from "next/image";
import qq from "../assets/image/qq.png";
import wechat from "../assets/image/wechat.png";
import { links } from "@/config/links";

// 信任数字条（数据源：工作室概况.md）
const trustStats = [
  { num: "3", label: "次众筹" },
  { num: "约 17 万", label: "累计支持金额" },
  { num: "1000+", label: "位玩家支持" },
];

// 团队故事 teaser 头像（→ /about）
const teamAvatars = [
  { src: "/avatars/xi.jpg", alias: "夕惕" },
  { src: "/avatars/juemingzi.png", alias: "决明子" },
  { src: "/avatars/feilaishan.png", alias: "千寻挞" },
  { src: "/avatars/zhuxianbian.jpg", alias: "朱仙变" },
];

// 产品线（主题源：工作室概况.md，一句话钩子摘自剧情文本.md）
const products = [
  {
    name: "《话说！》本体",
    tag: "核心游戏",
    theme: "武林镖局失踪事件",
    hook: "元和二年，大荒镖局运来一件神秘武器，高手如云，却无一人归来。",
  },
  {
    name: "江湖夜雨",
    tag: "扩展包",
    theme: "黑暗悬疑 · 江湖破案",
    hook: "江湖事，江湖了——直到京城那个雨夜，规矩被打破了。",
  },
  {
    name: "儿女情长",
    tag: "扩展包",
    theme: "武侠爱情 · 情感纠葛",
    hook: "谁能不相思？谁又能不相爱？只盼故人来。",
  },
  {
    name: "幽镜志怪",
    tag: "扩展包",
    theme: "轻怪谈 · 超自然志异",
    hook: "那书生以茶换事，只因匣中有一个没有故事的妖怪。",
  },
];

// 玩家评价（来源：玩家评价.txt）
const reviews = [
  {
    author: "艾尔子",
    date: "2023-11-12",
    text: "牌很好，内容武侠感也很足，但是我没有和我一起书写故事的同伴，希望有伙伴的大家能多多游玩，最好还能制作游玩视频，来分享自己的江湖故事。",
  },
  {
    author: "SpawnMirage",
    date: "2022-02-06",
    text: "从一开始创意阶段就一直关注的《话说》终于到了自己手中，迫不及待地想要和小伙伴们一起讲述属于我们自己的江湖夜雨。",
  },
  {
    author: "世界与我差一个你",
    date: "2022-02-06",
    text: "武侠，说书，桌游，看似毫无关系，却也能紧密相连，不错不错！",
  },
];

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
          <div
            style={{
              maxHeight: "calc(100vh - 134px - 86px - 320px - 53px - 60px)",
            }}
          >
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
          <p className={styles.slogan}>江湖、故事和武侠梦</p>
          <p>
            《话说！》是一款以<strong>武侠元素</strong>为内核，<strong>故事接龙</strong>
            为形式的原创卡牌游戏。它的玩法类似于故事接龙，多名玩家通过抽取卡片轮流进行故事讲述，期间需要完成一些特定情节获得结局，并将故事走向引导至自己的结局。
          </p>

          <div className={styles.ctaRow}>
            {/* 淘宝已下架，暂时注释（恢复时取消注释）
            <a
              className={styles.btn}
              href={links.taobao}
              target="_blank"
              rel="noopener noreferrer"
            >
              淘宝购买
            </a>
            */}
            <a
              className={styles.btn}
              href={links.xiaohongshu}
              target="_blank"
              rel="noopener noreferrer"
            >
              小红书追踪
            </a>
          </div>
        </section>
      </div>
      <div className={styles.trustBar}>
        {trustStats.map((s) => (
          <div className={styles.trustItem} key={s.label}>
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.aboutTeaser}>
        <div className={styles.aboutAvatars}>
          {teamAvatars.map((a) => (
            <img src={a.src} alt={a.alias} key={a.alias} loading="lazy" />
          ))}
        </div>
        <h2>我们是 4 个江湖梦未醒的人</h2>
        <p>
          从一个玩法点子，到三次众筹、约 1000 位玩家的支持。
          <br />
          把那些留在书本与荧幕里的侠骨柔情，做成一套可以围坐着讲出来的游戏。
        </p>
        <a className={styles.btnGhost} href="/about">
          了解我们
        </a>
      </div>
      <div className={styles.huashuo} id="HuaShuo">
        <section>
          <p>
            可否记得老旧书本中字里行间中的<strong>侠骨柔情</strong>？
          </p>

          <p>
            无论是那高深莫测的<strong>武功绝学</strong>，
            <br /> 还是荧幕上光怪陆离的视觉奇观都曾给我们带来数不尽的感动——
          </p>

          <p>
            听过<strong>江湖夜雨</strong>，见证<strong>儿女情长</strong>，
            <br />
            为那些记忆中的故事有过热泪盈眶也有过怅然若失。
          </p>

          <p>
            我们希望能够以现实为载体，让那些有趣的故事不再只会停留在一个人的脑海里，而是在大家的思维碰撞下呈现出来耀眼的火花，玩家亦是主角亦是创造者。
          </p>
        </section>
      </div>
      <div className={styles.products} id="products">
        <div className={styles.productsHead}>
          <p>
            一个本体，三段江湖 <span>Products</span>
          </p>
        </div>
        <div className={styles.productGrid}>
          {products.map((p) => (
            <div className={styles.productCard} key={p.name}>
              <div className={styles.productTag}>{p.tag}</div>
              <h3>{p.name}</h3>
              <div className={styles.productTheme}>{p.theme}</div>
              <p className={styles.productHook}>{p.hook}</p>
            </div>
          ))}
        </div>
        <div className={styles.productBuy}>
          <p>本体必备，扩展任选 —— 关注小红书，第一时间获取上架与购买消息。</p>
          <a
            className={styles.btn}
            href={links.xiaohongshu}
            target="_blank"
            rel="noopener noreferrer"
          >
            去小红书看看
          </a>
          {/* 淘宝已下架，暂时注释（恢复时取消注释）
          <p>本体必备，扩展任选 —— 不知道买哪个？淘宝有全套与单件多档可选。</p>
          <a
            className={styles.btn}
            href={links.taobao}
            target="_blank"
            rel="noopener noreferrer"
          >
            去淘宝看看
          </a>
          */}
        </div>
      </div>
      <div className={styles.reviews}>
        <div className={styles.reviewsHead}>
          <h2>玩家的声音</h2>
          <span>What Players Say</span>
        </div>
        <div className={styles.reviewList}>
          {reviews.map((r) => (
            <blockquote className={styles.bubble} key={`${r.author}-${r.date}`}>
              <p className={styles.bubbleText}>{r.text}</p>
              <cite>
                <span className={styles.bubbleAuthor}>{r.author}</span>
                <span className={styles.bubbleDate}>{r.date}</span>
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
      <div className={styles.contact} id="about">
        <div className={styles.contactHead}>
          <h2>找到我们</h2>
          <span>Get in Touch</span>
        </div>
        <div className={styles.contactInner}>
          <div className={styles.qrCard}>
            <NImage src={qq} alt="玩家社群 QQ 群二维码" />
            <p>玩家社群</p>
          </div>
          <div className={styles.qrCard}>
            <NImage src={wechat} alt="联系我们 微信二维码" />
            <p>联系我们</p>
          </div>
        </div>
        <div className={styles.playerZone}>
          <p>已经拥有《话说！》？规则、卡牌与短篇都在这里。</p>
          <a className={styles.btnGhost} href="/huashuo">
            进入玩家专区
          </a>
        </div>
      </div>
    </div>
  );
}
