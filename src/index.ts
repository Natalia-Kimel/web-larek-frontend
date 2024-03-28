import './scss/styles.scss';

import { Api } from './components/components/base/Api';
import { LarekApi } from './components/components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { Component } from './components/components/base/Component';
import { EventEmitter } from './components/components/base/Events';
import { Model } from './components/components/base/Model';
import { Basket } from './components/components/common/Basket';
import { Form } from './components/components/common/Form';
import { Modal } from './components/components/common/Modal';
import { AppState } from './components/components/AppState';
import { Card, BasketItem } from './components/components/ItemCard';
import { Order } from './components/components/Order';
import { Success } from './components/components/Success';
import { Page } from './components/components/Page';
import { ensureAllElements, ensureElement, cloneTemplate, createElement } from './utils/utils';

const events = new EventEmitter();
const api = new LarekApi(CDN_URL, API_URL);

events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appData = new AppState({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);

const order = new Order(cloneTemplate(orderTemplate), events);