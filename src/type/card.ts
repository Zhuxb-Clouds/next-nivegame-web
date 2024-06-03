export interface queryType{
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
  type: string;
  pack: string;
  front: string;
  back: string;
  frontImage: string;
  backImage: string;
}
export interface optionType {
  label: string;
  value: number;
}

