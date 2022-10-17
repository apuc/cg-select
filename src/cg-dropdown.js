import {
  customStyles,
  createSelected,
  getFormatItem,
  customStylesFormat,
} from './components/utils';
import { createBreadcrumb } from './components/create-element';

export class DropDown {
  // Глобальные переменные класса
  #element;
  #list;
  #options;
  #caret;
  #items;
  #category;
  #selectedItems;
  #indexes = [];

  // Геттер возвращающий выбранные элементы
  get value() {
    return this.#selectedItems ?? null;
  }

  // Геттер возвращающий индексы выбранных элементов
  get indexes() {
    return this.#indexes ?? [];
  }

  // Конструктор принимающий настройки селекта
  constructor(options = {}) {
    this.#init(options);
    this.#render();
    this.#initEvent();
  }

  // Метод добавления елемента в список index == string/object
  addItem(item) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    if (!item) {
      return false;
    }

    const index = this.#items.length;

    this.#items.push(getFormatItem(item, index));
    this.#render();
  }

  // Метод удаления елемента из спискаindex == number
  deleteItem(index) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    const item = this.#items[index];

    this.#items.splice(index, 1);
    this.#render();
  }

  // Метод удаляющий все элементы списка.
  deleteItemAll() {
    this.#items.splice(0, this.#items.length);
    this.#render();
  }

  // Метод позволяющий в селекте выбрать элемент который будет изначально отрисовывать, index == number
  selectIndex(index) {
    if (this.#category) {
      console.log('can`t add item to category');
      return;
    }

    const options = this.#element.querySelectorAll('.list__item');

    if (index > options.length) {
      return;
    }

    const select = options[index].innerText;
    this.#render(select);
  }

  // Метод возвращающий елемент по номеру, number == number
  getElement(number) {
    return this.#items[number];
  }

  // Метод позволяющий сделать селект disabled, value == boolean;
  disabled(value) {
    if (typeof value !== 'boolean') {
      return;
    }

    const select = this.#element.querySelector('.cg-select');
    if (value === true) {
      this.#element.setAttribute('disabled', true);
      select.classList.add('disabled');
    } else {
      this.#element.removeAttribute('disabled');
      select.classList.remove('disabled');
    }
  }

  // Метод позволяющий открывать/закрывать селект с помощью кнопок, button == внешняя кнопка(HTMLElement); method == string;
  buttonControl(button, method) {
    button.addEventListener('click', () => {
      if (method === 'open') {
        this.#open(true);
      } else if (method === 'close') {
        this.#close();
      } else {
        return;
      }
    });
  }

  // Общая инициализация селекта и формирование элементов
  #init(options) {
    this.#options = options;
    const { items, multiselect, url } = this.#options;

    const elem = document.querySelector(options.selector);

    if (!elem) {
      throw new Error(`Element with selector ${options.selector}`);
    }

    this.#element = elem;

    this.#element.addEventListener('click', () => {
      this.#open();
    });

    this.#items = [];

    if (multiselect) {
      this.#selectedItems = [];
    }

    if (!items && url) {
      this.#renderUrl();
      return;
    }

    items.forEach((dataItem, index) => {
      if (dataItem.category && dataItem.categoryItems) {
        this.#category = dataItem.category;

        this.#items.push(this.#category);
        dataItem.categoryItems.forEach((categoryItem, indexCategory) => {
          this.#items.push(getFormatItem(categoryItem, indexCategory));
        });
      } else {
        this.#items.push(getFormatItem(dataItem, index));
      }
    });
  }

  // Метод отрисовывающий кнопку селекта и каретку
  #initSelected(select) {
    const { styles, selected, placeholder } = this.#options;

    if (selected) {
      createSelected(this.#element, selected);
    } else if (placeholder) {
      createSelected(this.#element, placeholder);
    } else {
      createSelected(this.#element, 'Select...');
    }

    if (styles) {
      customStyles(this.#element, styles);
    }

    if (select) {
      createSelected(this.#element, select, styles);
    }
  }

  // Общий рендер элементов в список и их настойка
  #render(select) {
    const { styles, multiselect } = this.#options;

    if (select || (select && styles)) {
      this.#initSelected(select);
      customStyles(this.#element, styles);
    } else {
      this.#initSelected();
    }

    const ulList = document.createElement('ul');

    ulList.classList.add('list');

    if (styles) {
      const { list } = styles;
      customStylesFormat(list, ulList);
    }

    this.#element.appendChild(ulList);

    this.#items.forEach((dataItem) => {
      const liItem = document.createElement('li');
      const strongItem = document.createElement('strong');

      liItem.classList.add('list__item');
      strongItem.classList.add('category');

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);

        liItem.appendChild(checkBox);
      }

      let textNode = '';

      if (dataItem.title) {
        textNode = document.createTextNode(dataItem.title);
        liItem.appendChild(textNode);
        ulList.appendChild(liItem);
      } else {
        textNode = document.createTextNode(dataItem);
        strongItem.appendChild(textNode);
        ulList.appendChild(strongItem);
      }
    });

    this.#items.filter((item, index) => {
      if (typeof item !== 'object') {
        this.#items.splice(index, 1);
      }
      return item;
    });

    this.#addOptionsBehaviour();
  }

  // Общий рендер элементов в список и их настойка с получением данных с URL
  async #renderUrl() {
    const { url, items, multiselect } = this.#options;

    if (items) {
      return;
    }

    if (!url) {
      return;
    }

    const response = await fetch(url);
    const dataUrl = await response.json();

    dataUrl.forEach((dataItem, index) => {
      const item = {
        id: dataItem.id,
        title: dataItem.name,
        value: index,
      };
      const ulUrl = this.#element.querySelector('.list');
      const liUrl = document.createElement('li');
      const textUrl = document.createTextNode(item.title);

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        checkBox.setAttribute('id', `chbox-${item.id}`);
        liUrl.appendChild(checkBox);
      }

      liUrl.classList.add('list__item');

      liUrl.appendChild(textUrl);
      ulUrl.appendChild(liUrl);

      this.#items.push(item);
    });

    this.#items.filter((item, index) => {
      if (typeof item !== 'object') {
        this.#items.splice(index, 1);
      }
      return item;
    });

    this.#addOptionsBehaviour();
  }

  // Метод открывающий список
  #open(oneClick) {
    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    if (oneClick === true) {
      this.#list.classList.add('open');
      this.#caret.classList.add('caret_rotate');
    } else {
      this.#list.classList.toggle('open');
      this.#caret.classList.toggle('caret_rotate');
    }
  }

  // Метод закрывающий список
  #close() {
    this.#list.classList.remove('open');
    this.#caret.classList.remove('caret_rotate');
  }

  // Метод реализовывающий выбор элементов в разных режимах. Обычный/Мультиселект/Мультиселект + мультиселект таг.
  #addOptionsBehaviour() {
    const { multiselect, placeholder, selected, multiselectTag } = this.#options;

    const options = this.#element.querySelectorAll('.list__item');
    const select = this.#element.querySelector('.selected');

    const ul = document.createElement('ul');

    if (multiselect) {
      ul.classList.add('multiselect-tag');
      select.classList.add('overflow-hidden');
    }

    options.forEach((option, index) => {
      option.addEventListener('click', (event) => {
        const item = this.#items[index];
        if (multiselect) {
          event.stopPropagation();
          option.classList.toggle('active');

          const checkBox = option.querySelector('input[type="checkbox"]');

          if (checkBox) {
            if (!(event.target instanceof HTMLInputElement)) {
              checkBox.checked = !checkBox.checked;
            }

            const checkIndex = this.#indexes.indexOf(index);

            if (checkIndex === -1) {
              this.#indexes.push(index);

              select.innerText = '';

              if (multiselectTag) {
                this.#selectedItems.push(item);
                select.appendChild(ul);

                const data = {
                  option: this.#options,
                  element: this.#element,
                  indexes: this.#indexes,
                  selectedItems: this.#selectedItems,
                };

                ul.appendChild(createBreadcrumb(data, item.title, index, item.id));
              } else {
                this.#selectedItems.push(item.title);
                select.innerText = this.#selectedItems;
              }
            } else {
              if (multiselectTag) {
                const tagItem = document.getElementById(`tag-${index}`);
                // TODO: bug error! in url
                ul.removeChild(tagItem);
              }
              this.#indexes.splice(checkIndex, 1);
              this.#selectedItems.splice(checkIndex, 1);
            }

            if (!this.#selectedItems.length) {
              if (placeholder) {
                select.innerText = placeholder;
              } else if (selected) {
                select.innerText = selected;
              } else {
                select.innerText = 'Select...';
              }
            } else {
              if (multiselectTag) {
                select.appendChild(ul);
              } else {
                select.innerText = this.#selectedItems;
              }
            }
          }
        } else {
          select.innerText = item.title;
          this.#selectedItems = item;

          options.forEach((option) => {
            option.classList.remove('active');
          });
          option.classList.add('active');
        }
      });
    });
  }

  // Метод позволяющий открывать/закрывать список по переданному эвенту.
  #initEvent() {
    const { event } = this.#options;
    if (!event) {
      return;
    }

    if (event) {
      if (event === 'mouseenter') {
        this.#element.addEventListener(event, () => {
          this.#open();
        });
        this.#element.addEventListener('mouseleave', () => {
          this.#close();
        });
      }
    }
  }
}
