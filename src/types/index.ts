export type ItemCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export type BasketItemIndex = {
	index: number;
};

export interface IItemCard {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    price: number | null;
    status: boolean;
}

export interface IItemList {
    total: number;
    items: IItemCard[];
}

export interface IBasket {
    item: IItemCard[];
    price: string;
}

export interface IOrderForm {
    address: string;
    email: string;
    phone: string;
    payment: string;
}

export interface IOrder extends IOrderForm {
    items: string[];
    total: number;
}

export interface IOrderResult extends IOrder {
    id: string;
    error?: string
}

export interface IAppState {
    catalog: IItemCard[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}
