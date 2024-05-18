import styles from "./NewsBox.module.css";

interface BoxProps {
  title: string;
  preview: string;
  date: string;
  id: string;
  maxTextNumber?: number;
}

function Box(prop: BoxProps) {
  const maxTextNumber = prop.maxTextNumber || 200;
  const preview =
    prop.preview.length > maxTextNumber
      ? prop.preview.slice(0, maxTextNumber) + "..."
      : prop.preview;
  return (
    <a href={"/new/" + prop.id} className={styles["news-box"]}>
      <p className={styles["news-title"]}>{prop.title}</p>
      <p className={styles["news-content"]}>{preview}</p>
      <p className={styles["news-time"]}>{prop.date}</p>
    </a>
  );
}

export default Box;
