import { customStyles, createSelected, checkItemStruct } from './components/utils';
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

  disabled(value) {
    if (typeof value !== 'boolean') {
      return;
    }

    if (value === true) {
      this.#element.setAttribute('disabled', true);
    } else {
      this.#element.removeAttribute('disabled');
    }
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

      if (checkItemStruct(dataItem)) {
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
    const { styles, multiselect, event } = this.#options;

    if (select || (select && styles)) {
      this.#initSelected(select);
      customStyles(this.#element, styles);
    } else {
      this.#initSelected();
    }

    const ulList = document.createElement('ul');

    if (styles) {
      const { list } = styles;

      if (ulList && list) {
        Object.entries(list).forEach(([key, value]) => {
          ulList.style[key] = value;
        });
      }
    }

    ulList.classList.add('list');
    this.#element.appendChild(ulList);

    this.#items.forEach((dataItem) => {
      const liItem = document.createElement('li');

      liItem.classList.add('list__item');

      if (multiselect) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.setAttribute('id', `chbox-${dataItem.id}`);

        liItem.appendChild(checkBox);
      }

      let textNode = document.createTextNode(dataItem.title);

      liItem.appendChild(textNode);
      ulList.appendChild(liItem);
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
