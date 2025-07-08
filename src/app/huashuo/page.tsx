import style from './page.module.css';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: '话说 实用工具',
};

export default async function Page() {
    return (
        <>
            <div className={style.container}>
                <a className={`${style.card} ${style.card1}`} href="/huashuo/card-comp">
                    <div className={style.cardInner}>
                        <span>卡</span>
                        <span>牌</span>
                        <span>对</span>
                        <span>照</span>
                    </div>
                </a>
                <a className={`${style.card} ${style.card2}`} href="/huashuo/rule-book">
                    <div className={style.cardInner}>
                        <span>规</span>
                        <span>则</span>
                        <span>预</span>
                        <span>览</span>
                    </div>
                </a>
            </div>
        </>
    );
}
