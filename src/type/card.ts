export interface queryType {
    types: string;
    pack: string;
    id: string;
    keyword: string;
    pageSize: string;
    page: string;
}

export interface cardType {
    id: number;
    author: string;
    type: number;
    pack: number;
    front: string;
    back: string;
    /** 卡面图 URL（由后端兼容层从 content.front_image 的 imageId 解析而来） */
    front_image?: string | null;
    back_image?: string | null;
}
export interface optionType {
    label: string;
    value: number;
}
