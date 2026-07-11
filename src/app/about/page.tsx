import type { Metadata } from "next";
import NImage from "next/image";
import styles from "./about.module.css";
import qq from "../../assets/image/qq.png";
import wechat from "../../assets/image/wechat.png";
import { links } from "@/config/links";

export const metadata: Metadata = {
  title: "关于我们 | 飞雪工作室",
  description:
    "飞雪工作室是 4 个做武侠梦的人组成的独立桌游团队，从一个玩法点子，到三次众筹、约 150 套卖到玩家手上。",
};

// 团队成员（花名 / 职位 / 自述，来源：官方关于我们页）
const members = [
  {
    alias: "夕惕",
    role: "策划",
    avatar: "/avatars/xi.jpg",
    desc: `好吧，既然被推到了策划的位置，那么请不要攻击我，我只是个孩子，我可以坐小孩那桌，谢谢 :)
什么？大家都躲在头像后面，而我是头本，希望大家摩止摩
不止策划，是保姆，是秘书，杂活小能手，
大家的建议我都会看，也很感谢，真的在学了在学了。`,
  },
  {
    alias: "决明子",
    role: "撰写者",
    avatar: "/avatars/juemingzi.png",
    desc: `咕？咕咕，咕咕咕！咕，咕咕嘎嘎！
一周里有六天想变成芝士面包，再用剩下那天去成为人类。`,
  },
  {
    alias: "飞来山上千寻挞",
    role: "一个画画的人",
    avatar: "/avatars/feilaishan.png",
    desc: "",
  },
  {
    alias: "朱仙变",
    role: "主催",
    avatar: "/avatars/zhuxianbian.jpg",
    desc: `主催的意思就是主要负责催决明子写起始牌，什么一个字没动是什么意思？你说的我完全听不懂。今晚交没问题吧？和我的排期表说去吧！我们都在努力的活着……`,
  },
];

// 众筹历程（文案摘自 docs：剧情文本.md 各部背景故事）
const milestones = [
  {
    round: "2021-10-8",
    title: "本体与江湖夜雨",
    desc: "谁年少时没有武侠梦？不想当那个鲜衣怒马、驰骋江湖的大侠？奇诡的阴谋、高超的武功、凄美的爱情，快意人生自当对酒当歌——无需佩剑，少年心动已入江湖。",
  },
  {
    round: "2023-8-27",
    title: "儿女情长",
    desc: "大侠也好、豪客也罢，谁能不相思？谁又能不相爱？多少人间非常事，不过恩恩怨怨情情爱爱。只盼故人来。",
  },
  {
    round: "2026-3-1",
    title: "幽镜志怪",
    desc: "侠肝义胆江湖行，尔虞我诈夜雨路。恩难偿，怨难尽，同舟一梦何所望。有道是——信是冥冥缘有主，人生何必用机关。",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero：官方关于我们文案 */}
      <header className={styles.hero}>
        <div className={styles.heroTitle}>
          <h1>关于我们</h1>
          <span>About Us</span>
        </div>
        <div className={styles.heroBody}>
          <p>
            又一次，结束了一盘《很久很久以前》的游戏，一个故事被我们创造出来，它有跌宕起伏的剧情、有各具特色的人物、有炫目迷神的战斗，但是我们总觉得少了什么。
          </p>
          <p>
            童话故事固然是好，但我们仍向往一些更能够引起我们共鸣的故事，不再是抱着水晶球的占卜女巫，而是拿着罗盘的算命老道；不再是身穿重甲的骑士，而是游历江湖的少侠；奇幻中的天空之城被耳熟能详的名山大川所取代，但其中孕育的梦想却丝毫未减。
          </p>
          <p className={styles.heroClosing}>
            这就是我们的故事，也是由你所编写的故事，这就是——<strong>话说！</strong>
          </p>
        </div>
      </header>

      {/* 团队成员 */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>团队成员</h2>
          <span>Our Team</span>
        </div>
        <div className={styles.memberGrid}>
          {members.map((m) => (
            <div className={styles.memberCard} key={m.alias}>
              <img
                className={styles.avatar}
                src={m.avatar}
                alt={`${m.alias} 的头像`}
                loading="lazy"
              />
              <div className={styles.memberInfo}>
                <div className={styles.memberTop}>
                  <span className={styles.alias}>{m.alias}</span>
                  <span className={styles.role}>{m.role}</span>
                </div>
                {m.desc && <p className={styles.selfDesc}>{m.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 众筹历程 */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>走过的路</h2>
          <span>Our Journey</span>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>3</strong>
            <span>次众筹</span>
          </div>
          <div className={styles.stat}>
            <strong>约 17 万</strong>
            <span>累计支持金额</span>
          </div>
          <div className={styles.stat}>
            <strong>1000+</strong>
            <span>位玩家支持</span>
          </div>
        </div>

        <ol className={styles.timeline}>
          {milestones.map((ms) => (
            <li className={styles.milestone} key={ms.round}>
              <div className={styles.dot} aria-hidden />
              <div className={styles.milestoneBody}>
                <div className={styles.round}>{ms.round}</div>
                <div className={styles.msTitle}>{ms.title}</div>
                <p>{ms.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 联系 / 社群 */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>找到我们</h2>
          <span>Get in Touch</span>
        </div>
        <div className={styles.contactRow}>
          <div className={styles.qrBox}>
            <NImage src={qq} alt="玩家社群 QQ 群二维码" />
            <p>玩家社群</p>
          </div>
          <div className={styles.qrBox}>
            <NImage src={wechat} alt="联系我们 微信二维码" />
            <p>联系我们</p>
          </div>
          <div className={styles.channelBox}>
            <p>也可以在这些地方找到《话说！》：</p>
            <div className={styles.channelLinks}>
              {/* 淘宝已下架，暂时注释（恢复时取消注释）
              <a href={links.taobao} target="_blank" rel="noopener noreferrer">
                淘宝店铺
              </a>
              */}
              <a href={links.xiaohongshu} target="_blank" rel="noopener noreferrer">
                小红书
              </a>
              <a href={links.bilibili} target="_blank" rel="noopener noreferrer">
                B站
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
