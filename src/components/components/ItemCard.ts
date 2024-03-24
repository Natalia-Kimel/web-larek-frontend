import {Component} from "./base/component";
import { ensureElement } from "../../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _price: HTMLSpanElement;

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._description = container.querySelector(`.${blockName}__description`);
        this._category = container.querySelector(`.${blockName}__category`);
        this._price = container.querySelector(`.${blockName}__price`);
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

    set description(value: string) {
        this.setText(this._description, value);
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    set price(value: number) {
        this.setText(this._price, value);
    }

    get price(): string {
        return this._price.textContent || '';
    }
}