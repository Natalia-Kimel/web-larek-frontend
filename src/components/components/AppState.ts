import { IAppState, IItemCard, IOrder, IOrderForm, FormErrors } from "../../types";
import { Model } from "./base/model";

export class AppState extends Model<IAppState> {
    basket: string[];
    catalog: IItemCard[];
    order: IOrder;
    preview: string | null;
    formErrors: FormErrors;

    addItemToBasket(item: IItemCard) {
        if(this.basket.includes(item.id)) return;
        this.basket.push(item.id);
        this.emitChanges('items:changed', { basket: this.basket });
    }

    removeItemFromBasket(item: IItemCard) {
        if(this.basket.includes(item.id)) {
            this.basket.filter((it) => it !== item.id)
            this.emitChanges('items:changed', { basket: this.basket });
        }
    }

    clearBasket() {
        this.basket = [];
        this.emitChanges('items:changed', { basket: this.basket });
    }

    getBasket(): IItemCard[] {
        return this.catalog.filter(item => this.basket.includes(item.id));
    }

    setOrderField(field: keyof IOrderForm, value: string) {
        this.order[field] = value;

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    setCatalog(items: IItemCard[]) {
        this.catalog = [...items];
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: IItemCard) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}