import { customStyles, createSelected } from './components/utils';
import { createBreadcrumb } from './components/create-element';

export class DropDown {
  #element;
  #list;
  #options;
  #caret;
  #items;
  #selectedItems;
  #indexes = [];

  get value() {
    return this.#selectedItems ?? null;
  }

  get indexes() {
    return this.#indexes ?? [];
  }

  constructor(options = {}) {
    this.#init(options);
    this.#render();
    this.#initEvent();
  }

  addItem(item) {
    if (!item) {
      return false;
    }

    const random = Math.random().toString(36).substring(2, 10);
    const index = this.#items.length;

    if (typeof item === 'object') {
      item = {
        id: item.id,
        title: item.title,
        value: item.value,
      };
    } else {
      item = {
        id: random,
        title: item,
        value: index,
      };
    }

    this.#items.push(item);
    this.#render();
  }

  deleteItem(item) {
    let index = this.#items.indexOf(item);

    this.#items.splice(index, 1);

    this.#render();
  }

  deleteItemAll() {
    this.#items.splice(0, this.#items.length);
    this.#render();
  }

  selectIndex(index) {
    const options = this.#element.querySelectorAll('.list__item');

    if (index > options.length) {
      return;
    }

    const select = options[index].innerText;

    this.#render(select);
  }

  getElement(number) {
    return this.#items[number];
  }

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

    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    this.#items = [];

    if (multiselect) {
      this.#selectedItems = [];
    }

    if (!items && url) {
      this.#renderUrl();
      return;
    }

    items.forEach((dataItem, index) => {
      const random = Math.random().toString(36).substring(2, 10);
      let item = {};

      if (this.#checkItemStruct(dataItem)) {
        item = {
          id: dataItem.id,
          title: dataItem.title,
          value: index,
        };
      } else {
        item = {
          id: random,
          title: dataItem,
          value: index,
        };
      }

      this.#items.push(item);
    });
  }

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

  #render(select) {
    const { styles, multiselect, multiselectTag } = this.#options;

    if (select || (select && styles)) {
      this.#initSelected(select);
      customStyles(this.#element, styles);
    } else {
      this.#initSelected();
    }

    const ul = document.createElement('ul');

    if (styles) {
      const { list } = styles;

      if (ul && list) {
        Object.entries(list).forEach(([key, value]) => {
          ul.style[key] = value;
        });
      }
    }

    ul.classList.add('list');
    this.#element.appendChild(ul);

    this.#items.forEach((dataItem) => {
      const li = document.createElement('li');

      li.classList.add('list__item');

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);

        li.appendChild(checkBox);
      }

      let textNode = document.createTextNode(dataItem.title);

      li.appendChild(textNode);
      ul.appendChild(li);
    });

    this.#addOptionsBehaviour();
  }

  async #renderUrl() {
    const { url, items, multiselect } = this.#options;

    if (items) {
      return;
    }

    if (!url) {
      return;
    }

    const response = await fetch(url);

    const data = await response.json();

    data.forEach((dataItem, index) => {
      const item = {
        id: dataItem.phone,
        title: dataItem.name,
        value: index,
      };
      const ul = this.#element.querySelector('.list');
      const li = document.createElement('li');
      const text = document.createTextNode(item.title);

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        checkBox.setAttribute('id', `chbox-${item.id}`);
        li.appendChild(checkBox);
      }

      li.classList.add('list__item');
      li.appendChild(text);
      ul.appendChild(li);

      this.#items.push(item);
    });

    this.#addOptionsBehaviour();
  }

  #open() {
    this.#list = this.#element.querySelector('.list');
    this.#caret = this.#element.querySelector('.caret');

    this.#list.classList.toggle('open');
    this.#caret.classList.toggle('caret_rotate');
  }

  #close() {
    this.#list.classList.remove('open');
    this.#caret.classList.remove('caret_rotate');
  }

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

              this.#selectedItems.push(item.title);

              select.innerText = '';

              if (multiselectTag) {
                select.appendChild(ul);

                ul.appendChild(
                  createBreadcrumb(
                    this.#options,
                    this.#element,
                    this.#indexes,
                    this.#selectedItems,
                    item.title,
                    index,
                    item.id,
                  ),
                );
              } else {
                select.innerText = this.#selectedItems;
              }
            } else {
              if (multiselectTag) {
                const tagItem = document.getElementById(`tag-${index}`);

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

  #initEvent() {
    const { event } = this.#options;
    if (!event) {
      return;
    }

    if (event) {
      let list = this.#element.querySelectorAll('.list');

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

  #checkItemStruct(item) {
    if (item && typeof item !== 'object') {
      return false;
    }

    return (
      item.hasOwnProperty('id') && item.hasOwnProperty('title') && item.hasOwnProperty('value')
    );
  }
}
