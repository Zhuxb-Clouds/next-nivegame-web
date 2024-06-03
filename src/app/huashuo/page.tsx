import style from "./page.module.css";

export default async function Page() {
  return (
    <>
      <div className={style.container}>
        <a className={style.card} href="/huashuo/card-comp">
          <span>卡</span>
          <span>牌</span>
          <span>对</span>
          <span>照</span>
        </a>
        <a className={style.card} href="/huashuo/rule-book">
          <span>规</span>
          <span>则</span>
          <span>预</span>
          <span>览</span>
        </a>
      </div>
    </>
  );
}
