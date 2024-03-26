import {Component} from "./base/Component";
import { ensureElement } from "../../utils/utils";
import { ItemCategory, BasketItemIndex } from "../../types";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _price: HTMLSpanElement;
    protected _button: HTMLButtonElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._description = container.querySelector(`.${blockName}__description`);
        this._category = container.querySelector(`.${blockName}__category`);
        this._price = container.querySelector(`.${blockName}__price`);
        this._button = container.querySelector(`.button`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    get image(): string {
        return this._image.textContent || '';
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

    get description (): string {
        return this._description.textContent || '';
    }

    set category(value: ItemCategory) {
        this.setText(this._category, value);
    }

    get category(): string {
        return this._category.textContent || '';
    }

    set price(value: number) {
        this.setText(this._price, value.toString());
    }

    get price(): string {
        return this._price.textContent || '';
    }
}

export class BasketItem extends Card<BasketItemIndex> {
	protected _index: HTMLElement;

	constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
		super(blockName, container, actions);
		this._index = ensureElement<HTMLElement>(`.basket__item-index`, container);
	}

	set index(value: number) {
		this.setText(this._index, value.toString());
	}
}