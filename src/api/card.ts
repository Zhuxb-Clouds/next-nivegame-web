import { fetch } from '../utils/fetch';
import { queryType, optionType, cardType } from "@/type/card";


export const getCardById = async (id: number) => {
  return await fetch(`/api/card/${id}`);
}

export const getCard = async (query: Partial<queryType>): Promise<{ rows: cardType[], count: number }> => {
  const params = new URLSearchParams(query);
  return await fetch(`/api/card?${params}`, {
    method: 'GET',
  });
}
export const getPackOptions = async (): Promise<optionType[]> => {
  return await fetch(`/api/enablePack`);
}

export const getTypeOptions = async (): Promise<optionType[]> => {
  return await fetch(`/api/type`);
}
