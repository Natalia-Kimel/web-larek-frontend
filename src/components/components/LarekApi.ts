import { Api } from "./base/Api";
import { IItemCard, IItemList, IOrderResult, IOrder } from "../../types";

export class LarekApi extends Api {
	readonly cdn: string;

	constructor(baseUrl: string, cdn: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	async getProducts(): Promise<IItemCard[]> {
		return this.get('/product/').then((data: IItemList) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image
			}))
		);
	}

	async getProduct(id: string): Promise<IItemCard> {
		return (await this.get(`/product/${id}`)) as IItemCard;
	}

	async createOrder(order: IOrder): Promise<IOrderResult> {
		return (await this.post('/order', order)) as IOrderResult;
	}
}