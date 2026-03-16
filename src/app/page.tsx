import styles from "./page.module.css";
import { Image } from "antd";
import qq from "../assets/image/qq.png";
import wechat from "../assets/image/wechat.png";
import crowdfunding from "@/data/crowdfunding.json";

const philosophyCards = [
  { src: "/镜中客5.jpeg", alt: "镜中客人物卡" },
  { src: "/游方郎中6.jpeg", alt: "游方郎中人物卡" },
  { src: "/img102.png", alt: "人物卡画面" },
];

export default function Home() {
  return (
    <div className={styles.container}>
      {/* ================= HERO SECTION ================= */}
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
          <div className={styles.companyTag}>飞雪 Nive Game Studio</div>
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
          <h1>古风毛线武侠桌游</h1>
          <p>
            《话说！》是一款由<strong>飞雪</strong>开发，以<strong>武侠元素</strong>
            为主题的毛线桌游。游戏规则简单、五分钟即可轻松上手，非常适合聚会休闲。大家通过抽卡轮流接龙讲故事，在胡编乱造与嬉笑怒骂中，合力编织出一段段离奇爆笑或是荡气回肠的专属武侠传奇！
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

      {/* ================= NEWS SECTION ================= */}
      {/* <div className={styles.news} id="news">
        <div className={styles.sectionTitle}>
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
      </div> */}

      {/* ================= PRODUCTS & PHILOSOPHY ================= */}
      <div className={styles.huashuo} id="HuaShuo">
        <div className={styles.sectionTitle}>
          <p>
            创作理念 <span>philosophy</span>
          </p>
        </div>
        <div className={styles.huashuoContent}>
          <aside className={styles.philosophyAside}>
            <p className={styles.philosophyEyebrow}>Feixue Editorial Note</p>
            <h3 className={styles.philosophyHeadline}>武侠是骨，叙事是魂。</h3>
            <p className={styles.philosophyAsideText}>
              对飞雪来说，最重要的从来不是某一种固定载体，而是能否让玩家在同一张桌前、同一个世界里，把属于自己的江湖故事真正讲出来。
            </p>
            <div className={styles.philosophyTags}>
              <span>武侠</span>
              <span>叙事</span>
              <span>共创</span>
            </div>
            <div className={styles.philosophyGallery}>
              {philosophyCards.map((card) => (
                <div className={styles.philosophyCard} key={card.src}>
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width="100%"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    preview={{ mask: "查看人物卡" }}
                  />
                </div>
              ))}
            </div>
          </aside>
          <section className={styles.philosophyText}>
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
            <p className={styles.highlightText}>
              这正是飞雪的初衷。我们相信载体只是桥梁，核心永远是“武侠”与“叙事”。我们希望打破媒介的界限，让那些有趣的故事不再只停留在一个人的脑海里，而是在大家的共同演绎下迸发出耀眼的火花。在这里，玩家既是主角，也是创造者。
            </p>
            <a href="/huashuo" className={styles.inlineMoreInfo} rel="noopener noreferrer">
              {"探索传说 ->"}
            </a>
          </section>
        </div>

        <div className={styles.productsArea}>
          <p className={styles.subTitle}>《话说！》系列产品线</p>
          <div className={styles.logos}>
            <Image
              preview={false}
              width="350px"
              height="auto"
              alt="Logo 1"
              src="https://oss.hrsrive.cn/%E8%AF%9D%E8%AF%B4logo%E9%80%8F%E6%98%8E.png"
            />
            <Image
              preview={false}
              width="350px"
              height="auto"
              alt="Logo 2"
              src="https://oss.hrsrive.cn/%E8%AF%9D%E8%AF%B4%E6%A8%AA%E5%90%91logo.png"
            />
            <Image
              preview={false}
              width="350px"
              height="auto"
              alt="Logo 3"
              src="https://oss.hrsrive.cn/%E5%84%BF%E5%A5%B3%E6%83%85%E9%95%BFlogo.png"
            />
          </div>
        </div>
      </div>

      <section className={styles.crowdfundingSection}>
        <div className={styles.sectionTitle}>
          <p>
            众筹历程 <span>crowdfunding</span>
          </p>
        </div>
        <p className={styles.crowdfundingLead}>{crowdfunding.lead}</p>
        <div className={styles.crowdfundingGrid}>
          {crowdfunding.projects.map((project) => (
            <article className={styles.crowdfundingCard} key={project.title}>
              <div className={styles.crowdfundingCardHeader}>
                <p className={styles.crowdfundingCardTitle}>{project.title}</p>
                <p className={styles.crowdfundingAmount}>{project.amount}</p>
              </div>
              <div className={styles.crowdfundingMeta}>
                <div className={styles.crowdfundingMetaItem}>
                  <span>达成率</span>
                  <strong>{project.completion}</strong>
                </div>
                <div className={styles.crowdfundingMetaItem}>
                  <span>支持者</span>
                  <strong>{project.supporters}</strong>
                </div>
                <div className={styles.crowdfundingMetaItem}>
                  <span>公开页数据</span>
                  <strong>{project.publicInfo}</strong>
                </div>
                <div className={styles.crowdfundingMetaItem}>
                  <span>项目状态</span>
                  <strong>{project.status}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.reviewsBlock}>
          <h3 className={styles.reviewHeading}>玩家评价</h3>
          <p className={styles.reviewLead}>{crowdfunding.reviewLead}</p>
          <div className={styles.reviewGrid}>
            {crowdfunding.reviews.map((review, index) => (
              <blockquote className={styles.reviewCard} key={`${review.author}-${index}`}>
                <p className={styles.reviewText}>“{review.quote}”</p>
                <footer className={styles.reviewAuthor}>{review.author}</footer>
              </blockquote>
            ))}
          </div>
          <p className={styles.reviewNote}>{crowdfunding.note}</p>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <div className={styles.contact} id="about">
        <div className={styles.aboutCompany}>
          <h2 className={styles.contactTitle}>
            关于我们 <span>About Us</span>
          </h2>
          <p className={styles.aboutDesc}>
            “以武侠为骨，以叙事为魂，链接每一种无限可能的情感与故事。”
            <br />
            <br />
            飞雪 (Nive Game Studio)
            是一支致力于探索极致互动叙事体验的开发团队。无论通过何种载体，我们都执着于将充满表现力的叙事机制与互动相结合。从《话说！》起步，我们期待与玩家一起，共同构建那些最生动鲜活的武侠图景。
          </p>
        </div>
        <div className={styles.socials}>
          <div className={styles.socialCard}>
            <p>玩家社群</p>
            <div className={styles.qrCodeWrapper}>
              <Image
                src={qq.src}
                alt="QQ 群"
                width="100%"
                style={{ width: "100%", height: "auto", display: "block", cursor: "pointer" }}
                preview={{ mask: "点击放大" }}
              />
            </div>
            <span>扫码加入官方交流群</span>
          </div>
          <div className={styles.socialCard}>
            <p>联系我们</p>
            <div className={styles.qrCodeWrapper}>
              <Image
                src={wechat.src}
                alt="微信"
                width="100%"
                style={{ width: "100%", height: "auto", display: "block", cursor: "pointer" }}
                preview={{ mask: "点击放大" }}
              />
            </div>
            <span>扫码添加官方微信</span>
          </div>
        </div>
      </div>
    </div>
  );
}
