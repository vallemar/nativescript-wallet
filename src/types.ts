
export type Card = {
    bg: string,
    imgType: string
}

export type Transaction = {
    id: number,
    title: string,
    subTitle: string,
    date: Date,
    image: string,
    price: number,
}

export interface ListItem<T = any> {
    item: T;
    index: number;
    even: boolean;
    odd: boolean;
  }