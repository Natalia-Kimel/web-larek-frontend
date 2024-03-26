
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Базовый код
1. Класс Component<T>
Находится в основе большинства компонент проекта, реализует работу с DOM-элементами.\
Является дженериком, в конструкторе принимает контейнер- DOM-элемент для взаимодействия.
- toggleClass- переключает класс
- setText- устанавливает текстовое содержимое
- setDisabled- сменяет статус блокировки
- setHidden- скрывает/показывает элемент
- setVisible- устанавливает изображение
- render- возвращает измененный DOM-элемент

2. Класс EventEmmiter
Реализует паттерн «наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.\
Его свойство- _events- объект Map с названием события и колбэк-функцией. Конструктор принимает экземпляр объекта Map и записывает его в свойство _events.\
Класс имеет методы on, off, emit для подписки на событие, отписки и уведомления подписчиков о наступлении события соответственно.\
Также реализованы методы onAll и offAll для подписки на все события и сброса всех подписчиков.\
Метод trigger генерирует событие с заданными аргументами, чтобы передавать его как обработчик события в другие классы. Эти классы будут генерировать события, не будучи при этом напрямую зависимыми от класса EventEmitter.

3. Класс API
Отвечает за получение и отправку данных на сервер.\
Принимает в конструкторе baseURL- основной корневой адрес и options- опции для запроса, записывает в свойства полученные данные и заголовки.\
Реализует методы:
- handleResponse- проверяет, пришел ли ответ с сервера, декодирует ответ в формате JSON
- get- получает данные с сервера
- post- отправляет данные на сервер

4. Класс Model
Абстрактный класс, чтобы можно было отличить модель от простых объектов с данными. Наследуется классом AppState.\
Конструктор принимает data- объект для проверки и events- события, возвращает измененный объект.\
Метод: emitChanges- сообщает, что модель поменялась.

## Компоненты модели данных
  Класс AppState  
Управляет содержимым всего приложения, позволяет покупателю полностью пользоваться сайтом.\
Реализует следующие методы:  
- addItemToBasket- добавляет товар в корзину, принимает элемент товара
- removeItemFromBasket- удаляет товар из корзины, принимает элемент товара
- clearBasket- очищает корзину
- getBasket- возвращает товары, которые находятся в корзине
- getTotal- получает итоговую сумму заказа
- setCatalog- устанавливает каталог товаров, принимает массив товаров
- setPreview- устанавливает превью товара, принимает элемент товара
- setOrderField- если в заказе верно указаны все данные, устанавливает окно с оформленным заказом
- validateOrder- валидирует заказ, проверяет наличие данных покупателя  

## Компоненты представления
1. Класс Card
Наследуется от класса Component, отображает элемент товара.\
Конструктор принимает blockName- название блока с карточкой, container- DOM-элемент, шаблон карточки и actions- функции для взаимодействия. Записывает в свойства конкретные DOM-элементы и вешает обработчик события на кнопку добавления в корзину.\
	Свойства (их тип- DOM-элемент):
- _title- заголовок карточки товара
- _description- описание товара
- _image- картинка товара
- _category- категория товара
- _price- цена товара
- _button- кнопка для перемещения товара в корзину\
	Сеттеры и геттеры:
- id- устанавливает id товара и получает к нему доступ
- title- название и получает к нему доступ
- description- описание и получает к нему доступ
- image- картинку и получает к ней доступ
- category- категорию и получает к ней доступ
- price- цену товара и получает к ней доступ

2. Класс BasketItem
Наследуется от класса Card, устанавливает индекс товара в корзине.\
Наследует конструктор + устанавливает в свойство _index DOM-элемент для индекса.\
Реализует сеттер index, который принимает число и устанавливает его как текст в качестве индекса.

3. Класс Form
Наследуется от класса Component, реализует форму оплаты.\
Конструктор принимает контейнер (HTML элемент) и события для взаимодействия с компонентами. Записывает в свойства конкретные DOM-элементы, вешает обработчик события input на поля и вызывает метод onInputChange. Также вешает обработчик на контейнер с формой и уведомляет подписчиков о ее отправке.\
	Свойства:
- _submit- DOM-элемент, кнопка отправки формы
- _errors- DOM-элемент ошибок в форме\
	Методы:
- onInputChange- реагирует на изменения в поле ввода
- render- собирает форму и отображает в контейнере
Сеттеры:
- valid- проверяет валидность данных в полях ввода и меняет состояние кнопки отправки формы.
- errors- устанавливает ошибки для полей формы

4. Класс Order
Наследуется от класса Form, устанавливает данные пользоателя в форму оплаты.\
Конструктор принимает контейнер с формой и события для взаимодействия с компонентами. Устанавливает в свойство _altButtons DOM-элемент и вешает обработчики события для переключения кнопок выбора способа оплаты.\
Свойство: _altButtons- кнопки переключения способа оплаты.\
	Сеттеры:
- phone- устанавливает номер
- email- устанавливает почту
- address- устанавливает адрес
- method- устанавливает метод оплаты согласно активной кнопке

5. Класс Basket
Наследуется от класса Component, реализует корзину. Устанавливает товары, находящиеся в корзине и итоговую стоимость.\
Конструктор принимает контейнер-корзину и события для взаимодействия с компонентами. Записывает в свойства конкретные DOM-элементы и вешает обработчик события на кнопку для оформления заказа.\
	Свойства (тип- DOM-элемент):
- _list- список товаров в корзине
- _total- итоговая стоимость заказа
- _button- кнопка Оформить\
	Сеттеры:
- items- изменяет состав корзины на актуальный/ выводит сообщение о пустой корзине и блокирует кнопку Оформить
- total- устанавливает итоговую стоимость заказа

6. Класс Modal
Наследуется от класса Component, реализует модальное окно приложения.\
Конструктор принимает контейнер-модальное окно и события. Записывает в свойства конкретные DOM-элементы и вешает обработчики события на кнопку и контейнер для закрытия модалки.\
	Свойства (тип- DOM-элемент):
- _closeButton- кнопка закрытия модалки
- _content- контейнер с контентом модалки\
	Методы:
- open- открывает модалку и сообщает об этом другим компонентам
- close- закрывает модалку и сообщает об этом другим компонентам
- render собирает модальное окно и помещает в контейнер

7. Класс Success
Наследуется от класса Component, при удачной оплате товара, отображает окно успешной оплаты.\
Конструктор принимает контейнер-модальное окно и действия для закрытия окна. Также устанавливает окну название и вешает обработчик события на кнопку закрытия.\
	Свойства (тип- DOM-элемент):
- _title- заголовок окна об успешной оплате
- _close- кнопка закрытия окна\
	Сеттер:
- title- устанавливает заголовок окна

8. Класс Page
Наследуется от класса Component, собирает страницу воедино. Устанавливает счетчик товаров в корзине, каталог товаров. Также устанавливает заблокированное состояние экрана при открытом модальном окне.\
Конструктор принимает контейнер-страницу(page) и события. Записывает в свойства конкретные DOM-элементы и вешает обработчик события на кнопку открытия корзины.\
	Свойства (тип- DOM-элемент):
- _counter- счетчик товаров в корзине у иконки корзины
- _gallery- контейнер для галереи товаров
- _wrapper- обертка всей страницы
- _basket- элемент корзины\
	Сеттеры:
- counter- устанавливает счетчик товаров в корзине
- gallery- помещает в контейнер список всех товаров
- locked- блокирует прокрутку страницы при открытом модальном окне

## Типы данных и события  
type ItemCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил'; - категории товара\
type FormErrors = Partial<Record<keyof IOrder, string>>; - ошибки формы\
type BasketItemIndex = {\
	index: number;\
}; - индекс товара в корзине

Интерфейс, описывающий карточку товара:
```
interface IItemCard {
    id: string;
    title: string;
    description: string;
    image: string;
    category: ItemCategory;
    price: number;
}
```
Интерфейс, описывающий каталог товаров:
```
interface IItemList {
    total: number;
    item: IItemCard[];
}
```
Интерфейс, описывающий корзину:
```
interface IBasket {
    item: IBasketItem[];
    price: number;
}
```
Интерфейс, описывающий форму оплаты:
```
interface IOrderForm {
    address: string;
    email: string;
    phone: string;
}
```
Интерфейс, описывающий заказ(данные для формы и выбранные товары):
```
interface IOrder extends IOrderForm {
    items: string[];
}
```
Интерфейс, описывающий данные, возвращаемые API при удачном заказе:
```
interface IOrderResult {
    id: string;
    total: number;
}
```
```
enum Events {
CHANGE_ITEMS = 'items:changed', // изменены товары
ORDER_READY = 'order:ready', // заказ успешно оплачен
OPEN_ORDER = 'order:open', // открытие модалки с оформлением заказа по кнопке из корзины
CHANGE_PREVIEW = 'preview:changed', // изменено превью товара
CHANGE_ERRORS = 'formErrors:change', // ошибки в заполнении формы
OPEN_MODAL = 'modal:open', // открытие модального окна
CLOSE_ MODAL = 'modal:close', // закрытие модального окна
OPEN_BASKET  = 'basket:open', // открытие корзины
SET_PAYMENT = 'payment:set' // установлен способ оплаты
};
```
![Untitled Diagram drawio (1)](https://github.com/Natalia-Kimel/web-larek-frontend/assets/138134586/7bd28608-a9c5-4c3c-8f93-c414ae08311f)
