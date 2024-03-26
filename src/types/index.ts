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
    category: ItemCategory;
    price: number;
}

export interface IItemList {
    total: number;
    item: IItemCard[];
}

export interface IBasket {
    item: IItemCard[];
    price: number;
}

export interface IOrderForm {
    address: string;
    email: string;
    phone: string;
    button: string;
}

export interface IOrder extends IOrderForm {
    items: string[];
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IAppState {
    catalog: IItemCard[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}
