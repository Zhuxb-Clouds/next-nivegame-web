import styles from "./NewsBox.module.css";

interface BoxProps {
  title: string;
  content: string;
  date: string;
  id: string;
  maxTextNumber?: number;
}

function Box(prop: BoxProps) {
  return (
    <a
      href={"/new/" + prop.id}
      className={styles["news-box"]}
    >
      <p className={styles["news-title"]}>{prop.title}</p>
      <p className={styles["news-content"]}>
        {prop.content.slice(0, prop.maxTextNumber || 200) + "..."}
      </p>
      <p className={styles["news-time"]}>{prop.date} </p>
    </a>
  );
}

export default Box;
