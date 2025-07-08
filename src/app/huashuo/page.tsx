import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: '话说 实用工具',
};

export default async function Page() {
    return (
        <div className={styles.pageWrapper}>
            {/* 顶部标题 */}
            <div className={styles.header}>
                <h1 className={styles.title}>话说工具集</h1>
                <p className={styles.subtitle}>Tools Collection</p>
            </div>

            {/* 分屏容器 */}
            <div className={styles.splitContainer}>
                {/* 左侧工具区域 */}
                <a href="/huashuo/card-comp" className={`${styles.toolSection} ${styles.toolLeft}`}>
                    <div className={styles.toolBackground}></div>
                    <div className={styles.toolContent}>
                        <h2 className={styles.toolTitle}>卡牌对照</h2>
                        <p className={styles.toolDescription}>查看详细的卡牌信息对照表，快速了解各种卡牌属性和特效说明</p>
                    </div>
                    <div className={styles.toolLabel}>01</div>
                </a>

                {/* 右侧工具区域 */}
                <a href="/huashuo/rule-book" className={`${styles.toolSection} ${styles.toolRight}`}>
                    <div className={styles.toolBackground}></div>
                    <div className={styles.toolContent}>
                        <h2 className={styles.toolTitle}>规则预览</h2>
                        <p className={styles.toolDescription}>浏览完整的游戏规则说明，掌握游戏玩法和策略技巧</p>
                    </div>
                    <div className={styles.toolLabel}>02</div>
                </a>

                {/* 中央分割线 */}
                <div className={styles.divider}></div>
            </div>

            {/* 底部指示器 */}
            <div className={styles.indicator}>
                <div className={`${styles.indicatorDot} ${styles.active}`}></div>
                <div className={styles.indicatorDot}></div>
            </div>
        </div>
    );
}
