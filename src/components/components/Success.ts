import { Component } from "./base/component";
import {ensureElement} from "../../utils/utils";

interface ISuccess {
    title: string;
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _title: HTMLElement;
    protected _close: HTMLButtonElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._close = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
        
        this._title = ensureElement<HTMLElement>('.order-success__title', this.container);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }
}