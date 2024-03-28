import { Api } from "./base/Api";
import { IItemCard, IItemList, IOrderResult, IOrder } from "../../types";

export class LarekApi extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	async getProducts(): Promise<IItemList> {
		return (await this.get('/item/')) as IItemList;
	}

	async getProduct(id: string): Promise<IItemCard> {
		return (await this.get(`/item/${id}`)) as IItemCard;
	}

	async createOrder(order: IOrder): Promise<IOrderResult> {
		return (await this.post('/order', order)) as IOrderResult;
	}
}